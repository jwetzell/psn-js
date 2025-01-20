import { Decoders } from '..';
import {
  DataTrackerTimestampChunk,
  DataTrackerTimestampChunkData,
} from '../../models/data/data-tracker-timestamp-chunk';

export default (buffer: Uint8Array): DataTrackerTimestampChunk => {
  const chunk = Decoders.Chunk(buffer);

  const view = new DataView(chunk.chunkData.buffer, chunk.chunkData.byteOffset, chunk.chunkData.byteLength);
  const timestamp = view.getBigUint64(0, true);

  const data: DataTrackerTimestampChunkData = {
    timestamp,
  };

  return {
    chunk,
    data,
  };
};
