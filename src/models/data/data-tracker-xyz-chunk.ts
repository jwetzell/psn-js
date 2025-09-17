import { Chunk } from '../chunk.js';

export interface DataTrackerXYZChunkData {
  x: number;
  y: number;
  z: number;
}

export interface DataTrackerXYZChunk {
  chunk: Chunk;
  data: DataTrackerXYZChunkData;
}
