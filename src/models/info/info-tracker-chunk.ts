import { Chunk } from '../chunk';
import { InfoTrackerNameChunk } from './info-tracker-name-chunk';

export interface InfoTrackerChunk extends Chunk {
  tracker_name?: InfoTrackerNameChunk;
}
