import { Chunk } from '../chunk.js';
import { DataTrackerChunk } from './data-tracker-chunk.js';

export interface DataTrackerListChunkData {
  trackers: DataTrackerChunk[];
}

export interface DataTrackerListChunk {
  chunk: Chunk;
  data: DataTrackerListChunkData;
}
