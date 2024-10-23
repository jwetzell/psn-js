import { Chunk } from '../chunk';

export interface DataTrackerFieldChunk extends Chunk {
  [key: string]: number | bigint | number[] | Uint8Array | undefined | boolean;
}
