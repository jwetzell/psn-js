import { Chunk } from '../chunk';
import { InfoTrackerNameChunk } from './info-tracker-name-chunk';

export interface InfoTrackerChunkData {
  trackerName: InfoTrackerNameChunk;
}

export interface InfoTrackerChunk {
  chunk: Chunk;
  data?: InfoTrackerChunkData;
}
