import { Constants } from '../../constants';
import chunk, { Chunk } from '../chunk';
import dataTrackerChunk, { DataTrackerChunk } from './data-tracker-chunk';

export interface DataTrackerListChunk extends Chunk {
  trackers: {
    [key: number]: DataTrackerChunk;
  };
}

function decodeDataTrackerListChunk(dataTrackerListChunk: DataTrackerListChunk) {
  dataTrackerListChunk.trackers = {};

  // TODO(jwetzell): add error handling
  let offset = 0;
  if (dataTrackerListChunk.chunk_data) {
    while (offset < dataTrackerListChunk.chunk_data.length) {
      const trackerChunk = dataTrackerChunk(dataTrackerListChunk.chunk_data.subarray(offset));
      offset += Constants.CHUNK_HEADER_SIZE;
      if (trackerChunk.data_len) {
        offset += trackerChunk.data_len;
      }
      if (trackerChunk.id) {
        dataTrackerListChunk.trackers[trackerChunk.id] = trackerChunk;
      }
    }
  }
}
export default (buffer: Buffer): DataTrackerListChunk =>
  chunk(buffer, decodeDataTrackerListChunk) as DataTrackerListChunk;
