const { CHUNK_HEADER_SIZE } = require('../../constants');
const chunk = require('../chunk');
const dataTrackerFieldChunk = require('./data-tracker-field-chunk');

function decodeTrackerChunk(trackerChunk) {
  if (trackerChunk.chunk_data && trackerChunk.data_len > 0) {
    let offset = 0;
    while (offset < trackerChunk.data_len) {
      const trackerFieldChunk = dataTrackerFieldChunk(trackerChunk.chunk_data.subarray(offset));
      offset += CHUNK_HEADER_SIZE;
      offset += trackerFieldChunk.data_len;
      switch (trackerFieldChunk.id) {
        case 0x0000:
          trackerChunk.pos = trackerFieldChunk;
          break;
        case 0x0001:
          trackerChunk.speed = trackerFieldChunk;
          break;
        case 0x0002:
          trackerChunk.ori = trackerFieldChunk;
          break;
        case 0x0003:
          trackerChunk.status = trackerFieldChunk;
          break;
        case 0x0004:
          trackerChunk.accel = trackerFieldChunk;
          break;
        case 0x0005:
          trackerChunk.trgtpos = trackerFieldChunk;
          break;
        case 0x0006:
          trackerChunk.timestamp = trackerFieldChunk;
          break;
        default:
          break;
      }
    }
  }
}

module.exports = (buffer) => chunk(buffer, decodeTrackerChunk);
