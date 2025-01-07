import { Chunk } from '../chunk';
import { PacketHeaderChunk } from '../packet-header-chunk';
import { DataTrackerListChunk } from './data-tracker-list-chunk';

export interface DataPacketChunkData {
  packetHeader?: PacketHeaderChunk;
  trackerList?: DataTrackerListChunk;
}

export interface DataPacketChunk {
  chunk: Chunk;
  data: DataPacketChunkData;
}
