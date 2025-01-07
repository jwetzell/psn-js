import { Chunk } from '../chunk';

export interface InfoSystemNameChunkData {
  systemName: string;
}

export interface InfoSystemNameChunk {
  chunk: Chunk;
  data: InfoSystemNameChunkData;
}
