import { Decoders } from '.';
import { DataPacketChunk, InfoPacketChunk, InfoTrackerChunk, PacketHeaderChunk } from './models';

export class Decoder {
  // TODO(jwetzell): check if these last packet headers are necessary to hold on to
  lastInfoPacketHeader?: PacketHeaderChunk;

  lastDataPacketHeader?: PacketHeaderChunk;

  infoPacketFrames: { [key: number]: InfoPacketChunk[] } = {};

  dataPacketFrames: { [key: number]: DataPacketChunk[] } = {};

  trackers: { [key: string]: InfoTrackerChunk } = {};

  system_name: string = '';
  constructor() {}

  updateInfo(framePackets: InfoPacketChunk[]) {
    framePackets.forEach((packet) => {
      if (packet.system_name) {
        this.system_name = packet.system_name.system_name;
      }

      if (packet.tracker_list?.trackers) {
        Object.entries(packet.tracker_list.trackers).forEach(([trackerId, tracker]) => {
          if (!this.trackers[trackerId]) {
            this.trackers[trackerId] = {};
          }
          this.trackers[trackerId].tracker_name = tracker.tracker_name;
        });
      }
    });
  }

  updateData(framePackets: DataPacketChunk[]) {
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
  decode(packetBuf: Uint8Array): DataPacketChunk | InfoPacketChunk | undefined {
    const packet = Decoders.Packet(packetBuf);
    if (packet === undefined) {
      return packet;
    }

    if (packet.id === 0x6756) {
      const infoPacket = packet as InfoPacketChunk;
      if (infoPacket && infoPacket.has_subchunks) {
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
        if (currentInfoPacketHeader.frame_id) {
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
        }

        this.lastInfoPacketHeader = currentInfoPacketHeader;
      }
    } else if (packet.id === 0x6755) {
      const dataPacket = packet as DataPacketChunk;
      if (dataPacket.has_subchunks) {
        const currentDataPacketHeader = dataPacket.packet_header;
        if (!currentDataPacketHeader) {
          // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
          throw new Error('malformed packet');
        }

        if (currentDataPacketHeader.frame_id) {
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
        }
        this.lastDataPacketHeader = currentDataPacketHeader;
      }
    }
    return packet;
  }

  // NOTE(jwetzell): gets merged set of tracker field keys minus the guaranteed properties
  getTrackerFields(): Set<string> {
    const keys = new Set(
      Object.values(this.trackers)
        .map((tracker) => Object.keys(tracker))
        .flat(1)
    );

    // NOTE(jwetzell): remove fields that definitely exist
    keys.delete('id');
    keys.delete('has_subchunks');
    keys.delete('data_len');
    keys.delete('chunk_data');

    return keys;
  }
}
