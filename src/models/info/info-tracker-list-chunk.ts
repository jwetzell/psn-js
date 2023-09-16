import { Chunk } from '../chunk';
import { InfoTrackerChunk } from './info-tracker-chunk';

export interface InfoTrackerListChunk extends Chunk {
  trackers: {
    [key: number]: InfoTrackerChunk;
  };
}
