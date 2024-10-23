import { Decoders } from '.';
import { PacketHeaderChunk } from '../models/packet-header-chunk';

function decodePacketHeaderChunk(packetHeaderChunk: PacketHeaderChunk) {
  if (packetHeaderChunk.chunk_data) {
    const view = new DataView(
      packetHeaderChunk.chunk_data.buffer,
      packetHeaderChunk.chunk_data.byteOffset,
      packetHeaderChunk.chunk_data.byteLength
    );
    packetHeaderChunk.packet_timestamp = view.getBigUint64(0, true);
    packetHeaderChunk.version_high = view.getUint8(8);
    packetHeaderChunk.version_low = view.getUint8(9);
    packetHeaderChunk.frame_id = view.getUint8(10);
    packetHeaderChunk.frame_packet_count = view.getUint8(11);
  }
}

export default (buffer: Uint8Array): PacketHeaderChunk => {
  return Decoders.Chunk(buffer, decodePacketHeaderChunk);
};
