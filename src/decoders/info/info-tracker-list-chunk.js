const { CHUNK_HEADER_SIZE } = require('../../constants');
const chunk = require('../chunk');
const infoTrackerChunk = require('./info-tracker-chunk');

function decodeInfoTrackerListChunk(infoTrackerListChunk) {
  infoTrackerListChunk.trackers = {};
  if (infoTrackerListChunk.has_subchunks && infoTrackerListChunk.chunk_data) {
    let offset = 0;
    while (offset < infoTrackerListChunk.data_len) {
      const trackerChunk = infoTrackerChunk(infoTrackerListChunk.chunk_data.subarray(offset));
      offset += CHUNK_HEADER_SIZE;
      offset += trackerChunk.data_len;
      infoTrackerListChunk.trackers[trackerChunk.id] = trackerChunk;
    }
  }
}
module.exports = (buffer) => chunk(buffer, decodeInfoTrackerListChunk);
