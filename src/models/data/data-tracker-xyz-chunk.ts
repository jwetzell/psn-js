import { Chunk } from '../chunk';

export interface DataTrackerXYZChunkData {
  x: number;
  y: number;
  z: number;
}

export interface DataTrackerXYZChunk {
  chunk: Chunk;
  data: DataTrackerXYZChunkData;
}
