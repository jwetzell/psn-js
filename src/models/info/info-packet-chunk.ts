import { Chunk } from '../chunk';
import { PacketHeaderChunk } from '../packet-header-chunk';
import { InfoSystemNameChunk } from './info-system-name-chunk';
import { InfoTrackerListChunk } from './info-tracker-list-chunk';

export interface InfoPacketChunk extends Chunk {
  packet_header: PacketHeaderChunk;
  system_name: InfoSystemNameChunk;
  tracker_list: InfoTrackerListChunk;
}
