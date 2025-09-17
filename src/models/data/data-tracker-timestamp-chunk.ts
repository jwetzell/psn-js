import { Chunk } from '../chunk.js';

export interface DataTrackerTimestampChunkData {
  timestamp: bigint;
}

export interface DataTrackerTimestampChunk {
  chunk: Chunk;
  data: DataTrackerTimestampChunkData;
}
