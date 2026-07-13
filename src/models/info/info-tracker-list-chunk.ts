import type { Chunk } from '../chunk.js';
import type { InfoTrackerChunk } from './info-tracker-chunk.js';

export interface InfoTrackerListChunkData {
	trackers: InfoTrackerChunk[];
}

export interface InfoTrackerListChunk {
	chunk: Chunk;
	data: InfoTrackerListChunkData;
}
