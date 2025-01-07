import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoTrackerChunk, InfoTrackerChunkData } from '../../models/info/info-tracker-chunk';

export default (buffer: Uint8Array): InfoTrackerChunk => {
  const chunk = Decoders.Chunk(buffer);

  if (chunk.header.hasSubchunks && chunk.chunkData && chunk.header.dataLen) {
    let offset = 0;
    while (offset < chunk.header.dataLen) {
      const view = new DataView(chunk.chunkData.buffer, chunk.chunkData.byteOffset, chunk.chunkData.byteLength);
      const chunkId = view.getUint16(offset, true);
      switch (chunkId) {
        case 0x0000:
          const data: InfoTrackerChunkData = {
            trackerName: Decoders.InfoTrackerNameChunk(chunk.chunkData.subarray(offset)),
          };
          offset += Constants.CHUNK_HEADER_SIZE;
          if (data.trackerName.chunk.header.dataLen) {
            offset += data.trackerName.chunk.header.dataLen;
          }
          return {
            chunk,
            data,
          };

        default:
          break;
      }
    }
  }

  return {
    chunk,
  };
};
