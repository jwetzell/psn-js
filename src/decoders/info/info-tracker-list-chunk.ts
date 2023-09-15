import { Constants } from '../../constants';
import chunk, { Chunk } from '../chunk';
import infoTrackerChunk, { InfoTrackerChunk } from './info-tracker-chunk';

export interface InfoTrackerListChunk extends Chunk {
  trackers: {
    [key: number]: InfoTrackerChunk;
  };
}
function decodeInfoTrackerListChunk(infoTrackerListChunk: InfoTrackerListChunk) {
  infoTrackerListChunk.trackers = {};
  if (infoTrackerListChunk.has_subchunks && infoTrackerListChunk.chunk_data) {
    let offset = 0;
    if (infoTrackerListChunk.data_len) {
      while (offset < infoTrackerListChunk.data_len) {
        const trackerChunk = infoTrackerChunk(infoTrackerListChunk.chunk_data.subarray(offset));
        offset += Constants.CHUNK_HEADER_SIZE;
        if (trackerChunk.data_len) {
          offset += trackerChunk.data_len;
        }
        if (trackerChunk.id) {
          infoTrackerListChunk.trackers[trackerChunk.id] = trackerChunk;
        }
      }
    }
  }
}
export default (buffer: Buffer): InfoTrackerListChunk =>
  chunk(buffer, decodeInfoTrackerListChunk) as InfoTrackerListChunk;
