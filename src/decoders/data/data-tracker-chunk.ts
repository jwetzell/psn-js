import { Decoders } from '..';
import { Constants } from '../../constants';
import { DataTrackerChunk, DataTrackerChunkData } from '../../models/data/data-tracker-chunk';

export default (buffer: Uint8Array): DataTrackerChunk => {
  const chunk = Decoders.Chunk(buffer);
  const data: DataTrackerChunkData = {};
  if (chunk.chunkData && chunk.header.dataLen) {
    let offset = 0;
    while (offset < chunk.header.dataLen) {
      const trackerFieldChunk = Decoders.Chunk(chunk.chunkData.subarray(offset));
      switch (trackerFieldChunk.header.id) {
        case 0x0000:
          data.pos = Decoders.DataTrackerXYZChunk(chunk.chunkData.subarray(offset));
          break;
        case 0x0001:
          data.speed = Decoders.DataTrackerXYZChunk(chunk.chunkData.subarray(offset));
          break;
        case 0x0002:
          data.ori = Decoders.DataTrackerXYZChunk(chunk.chunkData.subarray(offset));
          break;
        case 0x0003:
          data.status = Decoders.DataTrackerStatusChunk(chunk.chunkData.subarray(offset));
          break;
        case 0x0004:
          data.accel = Decoders.DataTrackerXYZChunk(chunk.chunkData.subarray(offset));
          break;
        case 0x0005:
          data.trgtpos = Decoders.DataTrackerXYZChunk(chunk.chunkData.subarray(offset));
          break;
        case 0x0006:
          data.timestamp = Decoders.DataTrackerTimestampChunk(chunk.chunkData.subarray(offset));
          break;
        default:
          break;
      }
      offset += Constants.CHUNK_HEADER_SIZE;
      offset += trackerFieldChunk.header.dataLen;
    }
  }

  return {
    chunk,
    data,
  };
};
