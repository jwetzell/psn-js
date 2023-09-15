/* eslint-disable no-case-declarations */
const chunk = require('../chunk');

function readXYZ(trackerFieldChunk, prefix) {
  if (prefix === undefined) {
    prefix = '';
  }

  trackerFieldChunk[`${prefix}x`] = trackerFieldChunk.chunk_data.readFloatLE(0);
  trackerFieldChunk[`${prefix}y`] = trackerFieldChunk.chunk_data.readFloatLE(4);
  trackerFieldChunk[`${prefix}z`] = trackerFieldChunk.chunk_data.readFloatLE(8);
}
function decodeTrackerFieldChunk(trackerFieldChunk) {
  if (trackerFieldChunk.id !== undefined) {
    switch (trackerFieldChunk.id) {
      case 0x0000:
        readXYZ(trackerFieldChunk, 'pos_');
        break;
      case 0x0001:
        readXYZ(trackerFieldChunk, 'speed_');
        break;
      case 0x0002:
        readXYZ(trackerFieldChunk, 'ori_');
        break;
      case 0x0003:
        trackerFieldChunk.validity = trackerFieldChunk.chunk_data.readFloatLE();
        break;
      case 0x0004:
        readXYZ(trackerFieldChunk, 'accel_');
        break;
      case 0x0005:
        readXYZ(trackerFieldChunk, 'trgtpos_');
        break;
      case 0x0006:
        trackerFieldChunk.tracker_timestamp = trackerFieldChunk.chunk_data.readBigUInt64LE();
        break;
      default:
        break;
    }
  }
}

module.exports = (buffer) => chunk(buffer, decodeTrackerFieldChunk);
