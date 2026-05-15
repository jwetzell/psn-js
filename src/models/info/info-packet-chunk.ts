import type { Chunk } from '../chunk.js';
import type { PacketHeaderChunk } from '../packet-header-chunk.js';
import type { InfoSystemNameChunk } from './info-system-name-chunk.js';
import type { InfoTrackerListChunk } from './info-tracker-list-chunk.js';

export interface InfoPacketChunkData {
  packetHeader?: PacketHeaderChunk;
  systemName?: InfoSystemNameChunk;
  trackerList?: InfoTrackerListChunk;
}
export interface InfoPacketChunk {
  chunk: Chunk;
  data: InfoPacketChunkData;
}
