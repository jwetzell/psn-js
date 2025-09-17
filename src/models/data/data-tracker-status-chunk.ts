import { Chunk } from '../chunk.js';

export interface DataTrackerStatusChunkData {
  validity: number;
}

export interface DataTrackerStatusChunk {
  chunk: Chunk;
  data: DataTrackerStatusChunkData;
}
