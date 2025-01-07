/* eslint-disable no-case-declarations */

import { Decoders } from '..';
import { DataTrackerStatusChunk, DataTrackerStatusChunkData } from '../../models/data/data-tracker-status-chunk';

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
