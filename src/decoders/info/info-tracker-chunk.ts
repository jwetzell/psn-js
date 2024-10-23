import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoTrackerChunk } from '../../models/info/info-tracker-chunk';

function decodeInfoTrackerChunk(infoTrackerChunk: InfoTrackerChunk) {
  if (infoTrackerChunk.has_subchunks && infoTrackerChunk.chunk_data && infoTrackerChunk.data_len) {
    let offset = 0;
    while (offset < infoTrackerChunk.data_len) {
      const view = new DataView(
        infoTrackerChunk.chunk_data.buffer,
        infoTrackerChunk.chunk_data.byteOffset,
        infoTrackerChunk.chunk_data.byteLength
      );
      const chunkId = view.getUint16(offset, true);
      switch (chunkId) {
        case 0x0000:
          infoTrackerChunk.tracker_name = Decoders.InfoTrackerNameChunk(infoTrackerChunk.chunk_data.slice(offset));
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

export default (buffer: Uint8Array): InfoTrackerChunk => Decoders.Chunk(buffer, decodeInfoTrackerChunk);
