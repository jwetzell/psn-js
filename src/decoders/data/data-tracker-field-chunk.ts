/* eslint-disable no-case-declarations */
import chunk, { Chunk } from '../chunk';

export interface DataTrackerFieldChunk extends Chunk {
  [key: string]: number | bigint | number[] | Buffer | undefined | boolean;
}

function readXYZ(trackerFieldChunk: DataTrackerFieldChunk, prefix: string = '') {
  if (trackerFieldChunk.chunk_data) {
    trackerFieldChunk[`${prefix}x`] = trackerFieldChunk.chunk_data.readFloatLE(0);
    trackerFieldChunk[`${prefix}y`] = trackerFieldChunk.chunk_data.readFloatLE(4);
    trackerFieldChunk[`${prefix}z`] = trackerFieldChunk.chunk_data.readFloatLE(8);
  }
}
function decodeTrackerFieldChunk(trackerFieldChunk: DataTrackerFieldChunk) {
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
        if (trackerFieldChunk.chunk_data) {
          trackerFieldChunk.validity = trackerFieldChunk.chunk_data.readFloatLE();
        }
        break;
      case 0x0004:
        readXYZ(trackerFieldChunk, 'accel_');
        break;
      case 0x0005:
        readXYZ(trackerFieldChunk, 'trgtpos_');
        break;
      case 0x0006:
        if (trackerFieldChunk.chunk_data) {
          trackerFieldChunk.tracker_timestamp = trackerFieldChunk.chunk_data.readBigUInt64LE();
        }
        break;
      default:
        break;
    }
  }
}

export default (buffer: Buffer): DataTrackerFieldChunk =>
  chunk(buffer, decodeTrackerFieldChunk) as DataTrackerFieldChunk;
