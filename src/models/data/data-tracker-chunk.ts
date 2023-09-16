import { Chunk } from '../chunk';
import { DataTrackerFieldChunk } from './data-tracker-field-chunk';

export interface DataTrackerChunk extends Chunk {
  pos?: DataTrackerFieldChunk;
  speed?: DataTrackerFieldChunk;
  ori?: DataTrackerFieldChunk;
  status?: DataTrackerFieldChunk;
  accel?: DataTrackerFieldChunk;
  trgtpos?: DataTrackerFieldChunk;
  timestamp?: DataTrackerFieldChunk;
}
