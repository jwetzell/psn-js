import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoTrackerChunk, InfoTrackerChunkData } from '../../models/info/info-tracker-chunk';

export default (buffer: Uint8Array): InfoTrackerChunk => {
  const chunk = Decoders.Chunk(buffer);

  if (chunk.header.hasSubchunks && chunk.chunkData && chunk.header.dataLen) {
    let offset = 0;
    while (offset < chunk.header.dataLen) {
      const chunkId = (chunk.chunkData.subarray(offset)[1] << 8) + chunk.chunkData.subarray(offset)[0];
      switch (chunkId) {
        case 0x0000: {
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
        }
        default:
          break;
      }
    }
  }

  return {
    chunk,
  };
};
