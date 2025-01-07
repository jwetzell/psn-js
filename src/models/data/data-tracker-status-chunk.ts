import { Chunk } from '../chunk';

export interface DataTrackerStatusChunkData {
  validity: number;
}

export interface DataTrackerStatusChunk {
  chunk: Chunk;
  data: DataTrackerStatusChunkData;
}
