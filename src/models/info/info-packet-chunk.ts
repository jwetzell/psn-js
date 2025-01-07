import { Chunk } from '../chunk';
import { PacketHeaderChunk } from '../packet-header-chunk';
import { InfoSystemNameChunk } from './info-system-name-chunk';
import { InfoTrackerListChunk } from './info-tracker-list-chunk';

export interface InfoPacketChunkData {
  packetHeader?: PacketHeaderChunk;
  systemName?: InfoSystemNameChunk;
  trackerList?: InfoTrackerListChunk;
}
export interface InfoPacketChunk {
  chunk: Chunk;
  data: InfoPacketChunkData;
}
