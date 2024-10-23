import { Decoders } from '..';
import { Constants } from '../../constants';
import { DataTrackerChunk } from '../../models/data/data-tracker-chunk';

function decodeTrackerChunk(trackerChunk: DataTrackerChunk) {
  if (trackerChunk.chunk_data && trackerChunk.data_len) {
    let offset = 0;
    while (offset < trackerChunk.data_len) {
      const trackerFieldChunk = Decoders.DataTrackerFieldChunk(trackerChunk.chunk_data.slice(offset));
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

export default (buffer: Uint8Array): DataTrackerChunk => Decoders.Chunk(buffer, decodeTrackerChunk) as DataTrackerChunk;
