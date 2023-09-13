const dataChunk = require('./encoders/data/data-chunk');
const dataTrackerListChunk = require('./encoders/data/data-tracker-list-chunk');
const infoChunk = require('./encoders/info/info-chunk');
const infoSystemNameChunk = require('./encoders/info/info-system-name-chunk');
const infoTrackerListChunk = require('./encoders/info/info-tracker-list-chunk');
const packetHeaderChunk = require('./encoders/packet-header-chunk');

const MAX_TRACKER_LIST_SIZE = 1000;

class Encoder {
  constructor(systemName, versionHigh, versionLow) {
    this.systemName = systemName;
    this.versionHigh = versionHigh;
    this.versionLow = versionLow;
    this.dataFrameId = 1;
    this.infoFrameId = 1;
  }

  getInfoPackets(timestamp, trackers) {
    const trackerChunks = trackers.map((tracker) => tracker.getInfoChunk());

    const infoPackets = [];

    const trackerChunksLists = [];
    let currentTrackerList = [];

    let currentTrackerListSize = 0;

    trackerChunks.forEach((trackerChunk) => {
      if (currentTrackerListSize + trackerChunk.length > MAX_TRACKER_LIST_SIZE) {
        trackerChunksLists.push(currentTrackerList);
        currentTrackerList = [];
        currentTrackerListSize = 0;
      }
      currentTrackerList.push(trackerChunk);
      currentTrackerListSize += trackerChunk.length;
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
      infoPackets.push(infoChunk(header, infoSystemNameChunk(this.systemName), infoTrackerListChunk(trackerChunkList)));
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

    let currentTrackerListSize = 0;

    allTrackerChunks.forEach((trackerChunk) => {
      if (currentTrackerListSize + trackerChunk.length > MAX_TRACKER_LIST_SIZE) {
        trackerChunksLists.push(currentTrackerList);
        currentTrackerList = [];
        currentTrackerListSize = 0;
      }
      currentTrackerList.push(trackerChunk);
      currentTrackerListSize += trackerChunk.length;
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
      dataPackets.push(dataChunk(header, dataTrackerListChunk(trackerChunks)));
    });
    this.dataFrameId += 1;
    if (this.dataFrameId > 255) {
      this.dataFrameId = 0;
    }
    return dataPackets;
  }
}

module.exports = Encoder;
