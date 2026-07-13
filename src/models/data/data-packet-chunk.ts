import type { Chunk } from '../chunk.js';
import type { PacketHeaderChunk } from '../packet-header-chunk.js';
import type { DataTrackerListChunk } from './data-tracker-list-chunk.js';

export interface DataPacketChunkData {
	packetHeader?: PacketHeaderChunk;
	trackerList?: DataTrackerListChunk;
}

export interface DataPacketChunk {
	chunk: Chunk;
	data: DataPacketChunkData;
}
