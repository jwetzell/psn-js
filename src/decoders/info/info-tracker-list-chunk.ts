import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoTrackerListChunk } from '../../models/info/info-tracker-list-chunk';

function decodeInfoTrackerListChunk(infoTrackerListChunk: InfoTrackerListChunk) {
  infoTrackerListChunk.trackers = {};
  if (infoTrackerListChunk.has_subchunks && infoTrackerListChunk.chunk_data) {
    let offset = 0;
    if (infoTrackerListChunk.data_len) {
      while (offset < infoTrackerListChunk.data_len) {
        const trackerChunk = Decoders.InfoTrackerChunk(infoTrackerListChunk.chunk_data.subarray(offset));
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
  Decoders.Chunk(buffer, decodeInfoTrackerListChunk) as InfoTrackerListChunk;
