import { Chunk } from '../chunk';

export interface DataTrackerFieldChunk extends Chunk {
  [key: string]: number | bigint | number[] | Buffer | undefined | boolean;
}
