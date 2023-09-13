const PacketParser = require('./decoders/packet');
const InfoPacket = require('./models/packets/info-packet');
const DataPacket = require('./models/packets/data-packet');

class Decoder {
  lastInfoPacketHeader;

  lastDataPacketHeader;

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
    framePackets.forEach((packet) => {
      packet.subChunks?.forEach((subChunk) => {
        if (subChunk.id === 0x0001) {
          subChunk.trackers?.forEach((tracker) => {
            if (this.data.trackers[tracker.id] === undefined) {
              this.data.trackers[tracker.id] = {};
            }
            this.data.trackers[tracker.id] = {
              pos: tracker.pos,
              speed: tracker.speed,
              ori: tracker.ori,
              status: tracker.status,
              accel: tracker.accel,
              trgtpos: tracker.trgtpos,
              timestamp: tracker.timestamp,
            };
          });
        }
      });
    });
  }

  // TODO(jwetzell): add invalid frame id decoding. Scenario where a frame id is reused before one is complete
  decode(packetBuf) {
    const packet = PacketParser.parse(packetBuf);

    if (packet.id === 0x6756) {
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
            this.updateInfo(this.infoPacketFrames[currentInfoPacketHeader.frame_id]);
            delete this.infoPacketFrames[currentInfoPacketHeader.frame_id];
          }

          this.lastInfoPacketHeader = currentInfoPacketHeader;
        }
      }
    } else if (packet.id === 0x6755) {
      const dataPacket = new DataPacket(packet);
      if (dataPacket) {
        if (dataPacket.subChunks?.length > 0) {
          const currentDataPacketHeader = dataPacket.getHeaderPacket();
          if (!currentDataPacketHeader) {
            // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
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
            this.updateData(this.dataPacketFrames[currentDataPacketHeader.frame_id]);
            delete this.dataPacketFrames[currentDataPacketHeader.frame_id];
          }

          this.lastDataPacketHeader = currentDataPacketHeader;
        }
      }
    }
  }
}

module.exports = Decoder;
