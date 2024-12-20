import { Decoders } from '..';
import { Constants } from '../../constants';
import { DataTrackerListChunk } from '../../models/data/data-tracker-list-chunk';

function decodeDataTrackerListChunk(dataTrackerListChunk: DataTrackerListChunk) {
  dataTrackerListChunk.trackers = {};

  // TODO(jwetzell): add error handling
  let offset = 0;
  if (dataTrackerListChunk.chunk_data) {
    while (offset < dataTrackerListChunk.chunk_data.length) {
      const trackerChunk = Decoders.DataTrackerChunk(dataTrackerListChunk.chunk_data.slice(offset));
      offset += Constants.CHUNK_HEADER_SIZE;
      if (trackerChunk.data_len) {
        offset += trackerChunk.data_len;
      }
      if (trackerChunk.id !== undefined) {
        dataTrackerListChunk.trackers[trackerChunk.id] = trackerChunk;
      }
    }
  }
}
export default (buffer: Uint8Array): DataTrackerListChunk =>
  Decoders.Chunk(buffer, decodeDataTrackerListChunk) as DataTrackerListChunk;
