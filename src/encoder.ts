import { Tracker } from './models/tracker';

import { Constants } from './constants';
import dataPacketChunk from './encoders/data/data-packet-chunk';
import dataTrackerListChunk from './encoders/data/data-tracker-list-chunk';
import infoPacketChunk from './encoders/info/info-packet-chunk';
import infoSystemNameChunk from './encoders/info/info-system-name-chunk';
import infoTrackerListChunk from './encoders/info/info-tracker-list-chunk';
import packetHeaderChunk from './encoders/packet-header-chunk';

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

  getInfoPackets(timestamp: bigint, trackers: Tracker[], frameId?: number) {
    if (frameId !== undefined) {
      if (!Number.isInteger(frameId)) {
        throw new Error('frame id must be an integer');
      }

      if (frameId > 255 || frameId < 0) {
        throw new Error('frame id must be >= 0 and <= 255');
      }
    }

    const systemNameChunk = infoSystemNameChunk(this.systemName);

    const trackerChunks = trackers.map((tracker: Tracker) => tracker.getInfoChunk());

    const infoPackets: Buffer[] = [];

    const trackerChunksLists: Buffer[][] = [];
    let currentTrackerList: Buffer[] = [];

    let currentInfoPacketSize = Constants.MAX_UDP_PACKET_SIZE + systemNameChunk.length + Constants.CHUNK_HEADER_SIZE;

    trackerChunks.forEach((trackerChunk: Buffer) => {
      if (currentInfoPacketSize + trackerChunk.length > Constants.MAX_UDP_PACKET_SIZE) {
        trackerChunksLists.push(currentTrackerList);
        currentTrackerList = [];
        currentInfoPacketSize = 0;
      }
      currentTrackerList.push(trackerChunk);
      currentInfoPacketSize += trackerChunk.length;
    });
    trackerChunksLists.push(currentTrackerList);
    const header = packetHeaderChunk(
      timestamp,
      this.versionHigh,
      this.versionLow,
      frameId ? frameId : this.infoFrameId,
      trackerChunksLists.length
    );
    trackerChunksLists.forEach((trackerChunkList) => {
      infoPackets.push(infoPacketChunk(header, systemNameChunk, infoTrackerListChunk(trackerChunkList)));
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
    const dataPackets: Buffer[] = [];

    const trackerChunksLists: Buffer[][] = [];
    let currentTrackerList: Buffer[] = [];

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

    const header = packetHeaderChunk(
      timestamp,
      this.versionHigh,
      this.versionLow,
      frameId ? frameId : this.dataFrameId,
      trackerChunksLists.length
    );
    trackerChunksLists.forEach((trackerChunks) => {
      dataPackets.push(dataPacketChunk(header, dataTrackerListChunk(trackerChunks)));
    });
    this.dataFrameId += 1;
    if (this.dataFrameId > 255) {
      this.dataFrameId = 0;
    }
    return dataPackets;
  }
}
