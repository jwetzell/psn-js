import { Chunk } from '../chunk';
import { DataTrackerChunk } from './data-tracker-chunk';

export interface DataTrackerListChunk extends Chunk {
  trackers: {
    [key: number]: DataTrackerChunk;
  };
}
