import { Chunk } from '../chunk';
import { DataTrackerStatusChunk } from './data-tracker-status-chunk';
import { DataTrackerTimestampChunk } from './data-tracker-timestamp-chunk';
import { DataTrackerXYZChunk } from './data-tracker-xyz-chunk';

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
