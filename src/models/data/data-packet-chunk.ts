import { Chunk } from '../chunk.js';
import { PacketHeaderChunk } from '../packet-header-chunk.js';
import { DataTrackerListChunk } from './data-tracker-list-chunk.js';

export interface DataPacketChunkData {
  packetHeader?: PacketHeaderChunk;
  trackerList?: DataTrackerListChunk;
}

export interface DataPacketChunk {
  chunk: Chunk;
  data: DataPacketChunkData;
}
