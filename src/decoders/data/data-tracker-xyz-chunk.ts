import { DataTrackerXYZChunk, DataTrackerXYZChunkData } from '../../models/data/data-tracker-xyz-chunk.js';
import { Decoders } from '../index.js';

export default (buffer: Uint8Array): DataTrackerXYZChunk => {
  const chunk = Decoders.Chunk(buffer);

  // TODO(jwetzell): add error handling
  const view = new DataView(chunk.chunkData.buffer, chunk.chunkData.byteOffset, chunk.chunkData.byteLength);

  const data: DataTrackerXYZChunkData = {
    x: view.getFloat32(0, true),
    y: view.getFloat32(4, true),
    z: view.getFloat32(8, true),
  };

  return {
    chunk,
    data,
  };
};
