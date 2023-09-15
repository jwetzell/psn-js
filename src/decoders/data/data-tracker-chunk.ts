import { Constants } from '../../constants';
import chunk, { Chunk } from '../chunk';
import dataTrackerFieldChunk, { DataTrackerFieldChunk } from './data-tracker-field-chunk';

export interface DataTrackerChunk extends Chunk {
  pos: DataTrackerFieldChunk;
  speed: DataTrackerFieldChunk;
  ori: DataTrackerFieldChunk;
  status: DataTrackerFieldChunk;
  accel: DataTrackerFieldChunk;
  trgtpos: DataTrackerFieldChunk;
  timestamp: DataTrackerFieldChunk;
}

function decodeTrackerChunk(trackerChunk: DataTrackerChunk) {
  if (trackerChunk.chunk_data && trackerChunk.data_len) {
    let offset = 0;
    while (offset < trackerChunk.data_len) {
      const trackerFieldChunk = dataTrackerFieldChunk(trackerChunk.chunk_data.subarray(offset));
      offset += Constants.CHUNK_HEADER_SIZE;
      if (trackerFieldChunk.data_len) {
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
}

export default (buffer: Buffer): DataTrackerChunk => chunk(buffer, decodeTrackerChunk) as DataTrackerChunk;
