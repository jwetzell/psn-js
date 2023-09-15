const { CHUNK_HEADER_SIZE } = require('../../constants');
const chunk = require('../chunk');
const infoTrackerNameChunk = require('./info-tracker-name-chunk');

function decodeInfoTrackerChunk(infoTrackerChunk) {
  if (infoTrackerChunk.has_subchunks && infoTrackerChunk.chunk_data) {
    let offset = 0;
    while (offset < infoTrackerChunk.data_len) {
      const chunkId = infoTrackerChunk.chunk_data.readUInt16LE(offset);
      switch (chunkId) {
        case 0x0000:
          infoTrackerChunk.tracker_name = infoTrackerNameChunk(infoTrackerChunk.chunk_data.subarray(offset));
          offset += CHUNK_HEADER_SIZE;
          offset += infoTrackerChunk.tracker_name.data_len;
          break;

        default:
          break;
      }
    }
  }
}

module.exports = (buffer) => chunk(buffer, decodeInfoTrackerChunk);
