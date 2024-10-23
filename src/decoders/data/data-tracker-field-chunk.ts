/* eslint-disable no-case-declarations */

import { Decoders } from '..';
import { DataTrackerFieldChunk } from '../../models/data/data-tracker-field-chunk';

function readXYZ(trackerFieldChunk: DataTrackerFieldChunk, prefix: string = '') {
  if (trackerFieldChunk.chunk_data) {
    const view = new DataView(
      trackerFieldChunk.chunk_data.buffer,
      trackerFieldChunk.chunk_data.byteOffset,
      trackerFieldChunk.chunk_data.byteLength
    );
    trackerFieldChunk[`${prefix}x`] = view.getFloat32(0, true);
    trackerFieldChunk[`${prefix}y`] = view.getFloat32(4, true);
    trackerFieldChunk[`${prefix}z`] = view.getFloat32(8, true);
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
          const view = new DataView(
            trackerFieldChunk.chunk_data.buffer,
            trackerFieldChunk.chunk_data.byteOffset,
            trackerFieldChunk.chunk_data.byteLength
          );
          trackerFieldChunk.validity = view.getFloat32(0, true);
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
          const view = new DataView(
            trackerFieldChunk.chunk_data.buffer,
            trackerFieldChunk.chunk_data.byteOffset,
            trackerFieldChunk.chunk_data.byteLength
          );
          trackerFieldChunk.tracker_timestamp = view.getBigUint64(0, true);
        }
        break;
      default:
        break;
    }
  }
}

export default (buffer: Uint8Array): DataTrackerFieldChunk =>
  Decoders.Chunk(buffer, decodeTrackerFieldChunk) as DataTrackerFieldChunk;
