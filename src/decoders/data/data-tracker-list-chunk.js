const { CHUNK_HEADER_SIZE } = require('../../constants');
const chunk = require('../chunk');
const dataTrackerChunk = require('./data-tracker-chunk');

function decodeDataTrackerListChunk(dataTrackerListChunk) {
  dataTrackerListChunk.trackers = {};

  // TODO(jwetzell): add error handling
  let offset = 0;
  while (offset < dataTrackerListChunk.chunk_data.length) {
    const trackerChunk = dataTrackerChunk(dataTrackerListChunk.chunk_data.subarray(offset));
    offset += CHUNK_HEADER_SIZE;
    offset += trackerChunk.data_len;
    dataTrackerListChunk.trackers[trackerChunk.id] = trackerChunk;
  }
}
module.exports = (buffer) => chunk(buffer, decodeDataTrackerListChunk);
