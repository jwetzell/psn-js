import { Constants } from '../../constants';
import chunk, { Chunk } from '../chunk';
import infoTrackerNameChunk, { InfoTrackerNameChunk } from './info-tracker-name-chunk';

export interface InfoTrackerChunk extends Chunk {
  tracker_name?: InfoTrackerNameChunk;
}

function decodeInfoTrackerChunk(infoTrackerChunk: InfoTrackerChunk) {
  if (infoTrackerChunk.has_subchunks && infoTrackerChunk.chunk_data && infoTrackerChunk.data_len) {
    let offset = 0;
    while (offset < infoTrackerChunk.data_len) {
      const chunkId = infoTrackerChunk.chunk_data.readUInt16LE(offset);
      switch (chunkId) {
        case 0x0000:
          infoTrackerChunk.tracker_name = infoTrackerNameChunk(infoTrackerChunk.chunk_data.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (infoTrackerChunk.tracker_name?.data_len) {
            offset += infoTrackerChunk?.tracker_name?.data_len;
          }
          break;

        default:
          break;
      }
    }
  }
}

export default (buffer: Buffer): InfoTrackerChunk => chunk(buffer, decodeInfoTrackerChunk);
