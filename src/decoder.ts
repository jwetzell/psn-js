import { Decoders } from './index.js';
import { DataPacketChunk, InfoPacketChunk, Tracker, TrackerFromData, TrackerFromInfo } from './models/index.js';

export class Decoder {
  infoPacketFrames: { [key: number]: InfoPacketChunk[] } = {};

  dataPacketFrames: { [key: number]: DataPacketChunk[] } = {};

  trackers: { [key: string]: Tracker } = {};

  systemName: string = '';
  constructor() {}

  updateInfo(framePackets: InfoPacketChunk[]) {
    framePackets.forEach((packet) => {
      if (packet.data.systemName?.data) {
        this.systemName = packet.data.systemName?.data.systemName;
      }

      if (packet.data.trackerList?.data) {
        packet.data.trackerList.data.trackers.forEach((infoTrackerChunk) => {
          if (!this.trackers[infoTrackerChunk.chunk.header.id]) {
            const tracker = TrackerFromInfo(infoTrackerChunk);
            if (tracker) {
              this.trackers[infoTrackerChunk.chunk.header.id] = tracker;
            }
          }
          const tracker = this.trackers[infoTrackerChunk.chunk.header.id];
          tracker.updateInfo(infoTrackerChunk);
        });
      }
    });
  }

  updateData(framePackets: DataPacketChunk[]) {
    framePackets.forEach((packet) => {
      if (packet.data.trackerList) {
        packet.data.trackerList?.data.trackers.forEach((dataTrackerChunk) => {
          if (!this.trackers[dataTrackerChunk.chunk.header.id]) {
            const tracker = TrackerFromData(dataTrackerChunk);
            if (tracker) {
              this.trackers[dataTrackerChunk.chunk.header.id] = tracker;
            }
          }
          const tracker = this.trackers[dataTrackerChunk.chunk.header.id];
          tracker.updateData(dataTrackerChunk);
        });
      }
    });
  }

  // TODO(jwetzell): add invalid frame id decoding. Scenario where a frame id is reused before one is complete
  decode(packetBuf: Uint8Array) {
    const packet = Decoders.Chunk(packetBuf);
    if (packet === undefined) {
      return packet;
    }

    if (packet.header.id === 0x6756) {
      const infoPacket = Decoders.InfoPacketChunk(packetBuf);
      if (infoPacket && infoPacket.chunk.header.hasSubchunks) {
        const currentInfoPacketHeader = infoPacket.data.packetHeader;
        if (!currentInfoPacketHeader) {
          // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
          throw new Error('malformed packet');
        }

        const systemSubChunk = infoPacket.data.systemName;
        if (!systemSubChunk) {
          // NOTE(jwetzell): not sure that info packets without a system subchunk are valid?
          throw new Error('malformed packet');
        }
        if (currentInfoPacketHeader.data.frameId) {
          if (this.infoPacketFrames[currentInfoPacketHeader.data.frameId] === undefined) {
            this.infoPacketFrames[currentInfoPacketHeader.data.frameId] = [];
          }
          this.infoPacketFrames[currentInfoPacketHeader.data.frameId].push(infoPacket);

          if (
            this.infoPacketFrames[currentInfoPacketHeader.data.frameId].length ===
            currentInfoPacketHeader.data.framePacketCount
          ) {
            this.updateInfo(this.infoPacketFrames[currentInfoPacketHeader.data.frameId]);
            delete this.infoPacketFrames[currentInfoPacketHeader.data.frameId];
          }
        }
      }
    } else if (packet.header.id === 0x6755) {
      const dataPacket = Decoders.DataPacketChunk(packetBuf);
      if (dataPacket.chunk.header.hasSubchunks) {
        const currentDataPacketHeader = dataPacket.data.packetHeader;
        if (!currentDataPacketHeader) {
          // NOTE(jwetzell): not sure that info packets without a header subchunk are valid?
          throw new Error('malformed packet');
        }

        if (currentDataPacketHeader.data.frameId) {
          if (this.dataPacketFrames[currentDataPacketHeader.data.frameId] === undefined) {
            this.dataPacketFrames[currentDataPacketHeader.data.frameId] = [];
          }
          this.dataPacketFrames[currentDataPacketHeader.data.frameId].push(dataPacket);
          if (
            this.dataPacketFrames[currentDataPacketHeader.data.frameId].length ===
            currentDataPacketHeader.data.framePacketCount
          ) {
            this.updateData(this.dataPacketFrames[currentDataPacketHeader.data.frameId]);
            delete this.dataPacketFrames[currentDataPacketHeader.data.frameId];
          }
        }
      }
    }
  }
}
