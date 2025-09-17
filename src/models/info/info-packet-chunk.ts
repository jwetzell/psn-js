import { Chunk } from '../chunk.js';
import { PacketHeaderChunk } from '../packet-header-chunk.js';
import { InfoSystemNameChunk } from './info-system-name-chunk.js';
import { InfoTrackerListChunk } from './info-tracker-list-chunk.js';

export interface InfoPacketChunkData {
  packetHeader?: PacketHeaderChunk;
  systemName?: InfoSystemNameChunk;
  trackerList?: InfoTrackerListChunk;
}
export interface InfoPacketChunk {
  chunk: Chunk;
  data: InfoPacketChunkData;
}
