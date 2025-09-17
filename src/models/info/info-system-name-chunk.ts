import { Chunk } from '../chunk.js';

export interface InfoSystemNameChunkData {
  systemName: string;
}

export interface InfoSystemNameChunk {
  chunk: Chunk;
  data: InfoSystemNameChunkData;
}
