import { Chunk } from './chunk';

export interface PacketHeaderChunk extends Chunk {
  packet_timestamp?: bigint;
  version_high?: number;
  version_low?: number;
  frame_id?: number;
  frame_packet_count?: number;
}
