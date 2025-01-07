import { Chunk } from '../chunk';

export interface InfoTrackerNameChunkData {
  trackerName: string;
}

export interface InfoTrackerNameChunk {
  chunk: Chunk;
  data: InfoTrackerNameChunkData;
}
