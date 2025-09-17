import { Chunk } from '../chunk.js';

export interface InfoTrackerNameChunkData {
  trackerName: string;
}

export interface InfoTrackerNameChunk {
  chunk: Chunk;
  data: InfoTrackerNameChunkData;
}
