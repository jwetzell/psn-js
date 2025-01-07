import { Chunk } from '../chunk';
import { InfoTrackerChunk } from './info-tracker-chunk';

export interface InfoTrackerListChunkData {
  trackers: InfoTrackerChunk[];
}

export interface InfoTrackerListChunk {
  chunk: Chunk;
  data: InfoTrackerListChunkData;
}
