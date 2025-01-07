import { Chunk } from '../chunk';
import { DataTrackerChunk } from './data-tracker-chunk';

export interface DataTrackerListChunkData {
  trackers: DataTrackerChunk[];
}

export interface DataTrackerListChunk {
  chunk: Chunk;
  data: DataTrackerListChunkData;
}
