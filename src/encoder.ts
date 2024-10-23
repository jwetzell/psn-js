import { Encoders, Tracker } from '.';
import { Constants } from './constants';

export class Encoder {
  private systemName: string;
  private versionHigh: number;
  private versionLow: number;
  dataFrameId: number = 1;
  infoFrameId: number = 1;
  constructor(systemName: string, versionHigh: number = 2, versionLow: number = 3) {
    this.systemName = systemName;
    this.versionHigh = versionHigh;
    this.versionLow = versionLow;
  }

  setSystemName(systemName: string) {
    this.systemName = systemName;
  }
  setVersionHigh(versionHigh: number) {
    this.versionHigh = versionHigh;
  }

  setVersionLow(versionLow: number) {
    this.versionLow = versionLow;
  }

  resetDataFrameId() {
    this.dataFrameId = 1;
  }

  resetInfoFrameId() {
    this.infoFrameId = 1;
  }

  getInfoPackets(timestamp: bigint, trackers: Tracker[], frameId?: number) {
    if (frameId !== undefined) {
      if (!Number.isInteger(frameId)) {
        throw new Error('frame id must be an integer');
      }

      if (frameId > 255 || frameId < 0) {
        throw new Error('frame id must be >= 0 and <= 255');
      }
    }

    const systemNameChunk = Encoders.InfoSystemNameChunk(this.systemName);

    const trackerChunks = trackers.map((tracker: Tracker) => tracker.getInfoChunk());

    const infoPackets: Uint8Array[] = [];

    const trackerChunksLists: Uint8Array[][] = [];
    let currentTrackerList: Uint8Array[] = [];

    let currentInfoPacketSize = Constants.PACKET_HEADER_SIZE + systemNameChunk.length + Constants.CHUNK_HEADER_SIZE;

    trackerChunks.forEach((trackerChunk: Uint8Array) => {
      if (currentInfoPacketSize + trackerChunk.length > Constants.MAX_UDP_PACKET_SIZE) {
        trackerChunksLists.push(currentTrackerList);
        currentTrackerList = [];
        currentInfoPacketSize = 0;
      }
      currentTrackerList.push(trackerChunk);
      currentInfoPacketSize += trackerChunk.length;
    });
    trackerChunksLists.push(currentTrackerList);
    const header = Encoders.PacketHeaderChunk(
      timestamp,
      this.versionHigh,
      this.versionLow,
      frameId ? frameId : this.infoFrameId,
      trackerChunksLists.length
    );
    trackerChunksLists.forEach((trackerChunkList) => {
      infoPackets.push(
        Encoders.InfoPacketChunk(header, systemNameChunk, Encoders.InfoTrackerListChunk(trackerChunkList))
      );
    });
    this.infoFrameId += 1;
    if (this.infoFrameId > 255) {
      this.infoFrameId = 0;
    }
    return infoPackets;
  }

  getDataPackets(timestamp: bigint, trackers: Tracker[], frameId?: number) {
    if (frameId !== undefined) {
      if (!Number.isInteger(frameId)) {
        throw new Error('frame id must be an integer');
      }

      if (frameId > 255 || frameId < 0) {
        throw new Error('frame id must be >= 0 and <= 255');
      }
    }

    const allTrackerChunks = trackers.map((tracker) => tracker.getDataChunk());
    const dataPackets: Uint8Array[] = [];

    const trackerChunksLists: Uint8Array[][] = [];
    let currentTrackerList: Uint8Array[] = [];

    let currentDataPacketSize = Constants.PACKET_HEADER_SIZE + Constants.CHUNK_HEADER_SIZE;

    allTrackerChunks.forEach((trackerChunk) => {
      if (currentDataPacketSize + trackerChunk.length > Constants.MAX_UDP_PACKET_SIZE) {
        trackerChunksLists.push(currentTrackerList);
        currentTrackerList = [];
        currentDataPacketSize = 0;
      }
      currentTrackerList.push(trackerChunk);
      currentDataPacketSize += trackerChunk.length;
    });
    trackerChunksLists.push(currentTrackerList);

    const header = Encoders.PacketHeaderChunk(
      timestamp,
      this.versionHigh,
      this.versionLow,
      frameId ? frameId : this.dataFrameId,
      trackerChunksLists.length
    );
    trackerChunksLists.forEach((trackerChunks) => {
      dataPackets.push(Encoders.DataPacketChunk(header, Encoders.DataTrackerListChunk(trackerChunks)));
    });
    this.dataFrameId += 1;
    if (this.dataFrameId > 255) {
      this.dataFrameId = 0;
    }
    return dataPackets;
  }
}
