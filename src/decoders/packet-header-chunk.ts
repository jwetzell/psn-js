import chunk, { Chunk } from './chunk';
export interface PacketHeaderChunk extends Chunk {
  packet_timestamp?: bigint;
  version_high?: number;
  version_low?: number;
  frame_id?: number;
  frame_packet_count?: number;
}

function decodePacketHeaderChunk(packetHeaderChunk: PacketHeaderChunk) {
  // TODO(jwetzell): remove the string conversion
  if (packetHeaderChunk.chunk_data) {
    packetHeaderChunk.packet_timestamp = packetHeaderChunk.chunk_data.readBigUInt64LE(0);
    packetHeaderChunk.version_high = packetHeaderChunk.chunk_data.readUInt8(8);
    packetHeaderChunk.version_low = packetHeaderChunk.chunk_data.readUInt8(9);
    packetHeaderChunk.frame_id = packetHeaderChunk.chunk_data.readUInt8(10);
    packetHeaderChunk.frame_packet_count = packetHeaderChunk.chunk_data.readUInt8(11);
  }
}

export default (buffer: Buffer): PacketHeaderChunk => chunk(buffer, decodePacketHeaderChunk);
