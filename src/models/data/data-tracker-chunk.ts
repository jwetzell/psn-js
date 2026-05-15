import type { Chunk } from '../chunk.js';
import type { DataTrackerStatusChunk } from './data-tracker-status-chunk.js';
import type { DataTrackerTimestampChunk } from './data-tracker-timestamp-chunk.js';
import type { DataTrackerXYZChunk } from './data-tracker-xyz-chunk.js';

export interface DataTrackerChunkData {
  pos?: DataTrackerXYZChunk;
  speed?: DataTrackerXYZChunk;
  ori?: DataTrackerXYZChunk;
  status?: DataTrackerStatusChunk;
  accel?: DataTrackerXYZChunk;
  trgtpos?: DataTrackerXYZChunk;
  timestamp?: DataTrackerTimestampChunk;
}

export interface DataTrackerChunk {
  chunk: Chunk;
  data: DataTrackerChunkData;
}
