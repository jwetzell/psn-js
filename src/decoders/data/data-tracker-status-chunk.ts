import { DataTrackerStatusChunk, DataTrackerStatusChunkData } from '../../models/data/data-tracker-status-chunk.js';
import { Decoders } from '../index.js';

export default (buffer: Uint8Array): DataTrackerStatusChunk => {
  const chunk = Decoders.Chunk(buffer);

  const view = new DataView(chunk.chunkData.buffer, chunk.chunkData.byteOffset, chunk.chunkData.byteLength);
  const validity = view.getFloat32(0, true);

  const data: DataTrackerStatusChunkData = {
    validity,
  };

  return {
    chunk,
    data,
  };
};
