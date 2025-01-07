import { Chunk } from '../chunk';

export interface DataTrackerTimestampChunkData {
  timestamp: bigint;
}

export interface DataTrackerTimestampChunk {
  chunk: Chunk;
  data: DataTrackerTimestampChunkData;
}
