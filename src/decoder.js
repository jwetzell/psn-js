const packetDecoder = require('./decoders/packet');

class Decoder {
  // TODO(jwetzell): check if these last packet headers are necessary to hold on to
  lastInfoPacketHeader;

  lastDataPacketHeader;

  infoPacketFrames = {};

  dataPacketFrames = {};

  constructor() {
    this.system_name = '';

    this.trackers = {};
  }

  updateInfo(framePackets) {
    framePackets.forEach((packet) => {
      if (packet.system_name) {
        this.system_name = packet.system_name.system_name;
      }

      if (packet.tracker_list?.trackers) {
        Object.entries(packet.tracker_list.trackers).forEach(([trackerId, tracker]) => {
          this.trackers[trackerId] = {
            ...this.trackers[trackerId],
            ...tracker.tracker_name,
          };
        });
      }
    });
  }

  updateData(framePackets) {
    framePackets.forEach((packet) => {
      if (packet.tracker_list) {
        Object.entries(packet.tracker_list.trackers).forEach(([trackerId, tracker]) => {
          this.trackers[trackerId] = {
            ...this.trackers[trackerId],
            ...tracker,
          };
        });
      }
    });
  }

  // TODO(jwetzell): add invalid frame id decoding. Scenario where a frame id is reused before one is complete
  decode(packetBuf) {
    const packet = packetDecoder(packetBuf);
    if (packet.id === 0x6756) {
      const infoPacket = packet;
      if (infoPacket) {
        if (infoPacket.has_subchunks > 0) {
          const currentInfoPacketHeader = infoPacket.packet_header;
          if (!currentInfoPacketHeader) {
            // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
            throw new Error('malformed packet');
          }

          const systemSubChunk = infoPacket.system_name;
          if (!systemSubChunk) {
            // NOTE(jwetzell): not sure that info packets without a system subchunk are valid?
            throw new Error('malformed packet');
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
      const dataPacket = packet;
      if (dataPacket.has_subchunks) {
        const currentDataPacketHeader = dataPacket.packet_header;
        if (!currentDataPacketHeader) {
          // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
          throw new Error('malformed packet');
        }
        if (this.dataPacketFrames[currentDataPacketHeader.frame_id] === undefined) {
          this.dataPacketFrames[currentDataPacketHeader.frame_id] = [];
        }
        this.dataPacketFrames[currentDataPacketHeader.frame_id].push(dataPacket);
        if (
          this.dataPacketFrames[currentDataPacketHeader.frame_id].length === currentDataPacketHeader.frame_packet_count
        ) {
          this.updateData(this.dataPacketFrames[currentDataPacketHeader.frame_id]);
          delete this.dataPacketFrames[currentDataPacketHeader.frame_id];
        }
        this.lastDataPacketHeader = currentDataPacketHeader;
      }
    }
    return packet;
  }
}

module.exports = Decoder;
