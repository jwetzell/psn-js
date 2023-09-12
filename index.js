const PacketParser = require('./parsers/index.js');
const InfoPacket = require('./models/InfoPacket.js');
const DataPacket = require('./models/DataPacket.js');

const DATA_PACKET = 0x6755;
const INFO_PACKET = 0x6756;

class Decoder {
  infoPacketFrames = {};

  dataPacketFrames = {};

  constructor() {
    this.info = {
      trackers: {},
    };

    this.data = {
      trackers: {},
    };
  }

  updateInfo(framePackets) {
    // console.log('info update');
    framePackets.forEach((packet) => {
      packet.subChunks?.forEach((subChunk) => {
        if (subChunk.id === 0x0001) {
          // NOTE(jwetzell): system name subChunk
          this.info.system_name = subChunk.system_name;
        } else if (subChunk.id === 0x0002) {
          subChunk.trackers?.forEach((tracker) => {
            if (this.info.trackers[tracker.id] === undefined) {
              this.info.trackers[tracker.id] = {};
            }
            this.info.trackers[tracker.id].name = tracker.tracker_name.tracker_name;
          });
        }
      });
    });
  }

  updateData(framePackets) {
    // console.log('data update');
    framePackets.forEach((packet) => {
      packet.subChunks?.forEach((subChunk) => {
        if (subChunk.id === 0x0001) {
          subChunk.trackers?.forEach((tracker) => {
            if (this.data.trackers[tracker.id] === undefined) {
              this.data.trackers[tracker.id] = {};
            }
            tracker.fields?.forEach((field) => {
              Object.entries(field).forEach(([key, value]) => {
                this.data.trackers[tracker.id][key] = value;
              });
            });
          });
        }
      });
    });
  }

  // TODO(jwetzell): support multiple frame packets this might require some rework of how chunks are assumed
  decode(packetBuf) {
    const packet = PacketParser(packetBuf);

    if (packet.id === INFO_PACKET) {
      const infoPacket = new InfoPacket(packet);
      if (infoPacket) {
        if (infoPacket.subChunks?.length > 0) {
          const currentInfoPacketHeader = infoPacket.getHeaderPacket();
          if (!currentInfoPacketHeader) {
            // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
            return;
          }

          const systemSubChunk = infoPacket.getSystemPacket();
          if (!systemSubChunk) {
            // NOTE(jwetzell): not sure that info packets without a system subchunk are valid?
            return;
          }

          if (this.infoPacketFrames[currentInfoPacketHeader.frame_id] === undefined) {
            this.infoPacketFrames[currentInfoPacketHeader.frame_id] = [];
          }
          this.infoPacketFrames[currentInfoPacketHeader.frame_id].push(infoPacket);

          if (
            this.infoPacketFrames[currentInfoPacketHeader.frame_id].length ===
            currentInfoPacketHeader.frame_packet_count
          ) {
            // console.log('found complete info frame');
            this.updateInfo(this.infoPacketFrames[currentInfoPacketHeader.frame_id]);
            delete this.infoPacketFrames[currentInfoPacketHeader.frame_id];
          }
        }
      }
    } else if (packet.id === DATA_PACKET) {
      const dataPacket = new DataPacket(packet);
      if (dataPacket) {
        if (dataPacket.subChunks?.length > 0) {
          const currentDataPacketHeader = dataPacket.getHeaderPacket();
          if (!currentDataPacketHeader) {
            // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
            console.error('data packet with no header');
            return;
          }

          if (this.dataPacketFrames[currentDataPacketHeader.frame_id] === undefined) {
            this.dataPacketFrames[currentDataPacketHeader.frame_id] = [];
          }
          this.dataPacketFrames[currentDataPacketHeader.frame_id].push(dataPacket);

          if (
            this.dataPacketFrames[currentDataPacketHeader.frame_id].length ===
            currentDataPacketHeader.frame_packet_count
          ) {
            // console.log('found complete data frame');
            this.updateData(this.dataPacketFrames[currentDataPacketHeader.frame_id]);
            delete this.dataPacketFrames[currentDataPacketHeader.frame_id];
          }
        }
      }
    }
  }
}

module.exports = {
  Decoder,
};
