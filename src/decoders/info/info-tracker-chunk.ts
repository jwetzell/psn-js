import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoTrackerChunk } from '../../models/info/info-tracker-chunk';

function decodeInfoTrackerChunk(infoTrackerChunk: InfoTrackerChunk) {
  if (infoTrackerChunk.has_subchunks && infoTrackerChunk.chunk_data && infoTrackerChunk.data_len) {
    let offset = 0;
    while (offset < infoTrackerChunk.data_len) {
      const chunkId = infoTrackerChunk.chunk_data.readUInt16LE(offset);
      switch (chunkId) {
        case 0x0000:
          infoTrackerChunk.tracker_name = Decoders.InfoTrackerNameChunk(infoTrackerChunk.chunk_data.subarray(offset));
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

export default (buffer: Buffer): InfoTrackerChunk => Decoders.Chunk(buffer, decodeInfoTrackerChunk);
