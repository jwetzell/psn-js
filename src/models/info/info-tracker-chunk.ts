import type { Chunk } from '../chunk.js';
import type { InfoTrackerNameChunk } from './info-tracker-name-chunk.js';

export interface InfoTrackerChunkData {
	trackerName: InfoTrackerNameChunk;
}

export interface InfoTrackerChunk {
	chunk: Chunk;
	data?: InfoTrackerChunkData;
}
