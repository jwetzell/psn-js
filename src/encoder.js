const { MAX_UDP_PACKET_SIZE, PACKET_HEADER_SIZE, CHUNK_HEADER_SIZE } = require('./constants');
const dataPacketChunk = require('./encoders/data/data-packet-chunk');
const dataTrackerListChunk = require('./encoders/data/data-tracker-list-chunk');
const infoPacketChunk = require('./encoders/info/info-packet-chunk');
const infoSystemNameChunk = require('./encoders/info/info-system-name-chunk');
const infoTrackerListChunk = require('./encoders/info/info-tracker-list-chunk');
const packetHeaderChunk = require('./encoders/packet-header-chunk');

class Encoder {
  constructor(systemName, versionHigh = 2, versionLow = 3) {
    this.systemName = systemName;
    this.versionHigh = versionHigh;
    this.versionLow = versionLow;
    this.dataFrameId = 1;
    this.infoFrameId = 1;
  }

  getInfoPackets(timestamp, trackers) {
    const systemNameChunk = infoSystemNameChunk(this.systemName);

    const trackerChunks = trackers.map((tracker) => tracker.getInfoChunk());

    const infoPackets = [];

    const trackerChunksLists = [];
    let currentTrackerList = [];

    let currentInfoPacketSize = PACKET_HEADER_SIZE + systemNameChunk.length + CHUNK_HEADER_SIZE;

    trackerChunks.forEach((trackerChunk) => {
      if (currentInfoPacketSize + trackerChunk.length > MAX_UDP_PACKET_SIZE) {
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
      this.infoFrameId,
      trackerChunksLists.length
    );
    trackerChunksLists.forEach((trackerChunkList) => {
      infoPackets.push(infoPacketChunk(header, systemNameChunk, infoTrackerListChunk(trackerChunkList)));
    });
    this.dataFrameId += 1;
    if (this.dataFrameId > 255) {
      this.dataFrameId = 0;
    }
    return infoPackets;
  }

  getDataPackets(timestamp, trackers) {
    const allTrackerChunks = trackers.map((tracker) => tracker.getDataChunk());
    const dataPackets = [];

    const trackerChunksLists = [];
    let currentTrackerList = [];

    let currentDataPacketSize = PACKET_HEADER_SIZE + CHUNK_HEADER_SIZE;

    allTrackerChunks.forEach((trackerChunk) => {
      if (currentDataPacketSize + trackerChunk.length > MAX_UDP_PACKET_SIZE) {
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
      this.dataFrameId,
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

module.exports = Encoder;
