import { Chunk } from '../chunk';
import { PacketHeaderChunk } from '../packet-header-chunk';
import { DataTrackerListChunk } from './data-tracker-list-chunk';

export interface DataPacketChunk extends Chunk {
  packet_header: PacketHeaderChunk;
  tracker_list: DataTrackerListChunk;
}
