const chunk = require('./chunk');

function decodePacketHeaderChunk(packetHeaderChunk) {
  // TODO(jwetzell): remove the string conversion
  packetHeaderChunk.packet_timestamp = packetHeaderChunk.chunk_data.readBigUInt64LE(0);
  packetHeaderChunk.version_high = packetHeaderChunk.chunk_data.readUInt8(8);
  packetHeaderChunk.version_low = packetHeaderChunk.chunk_data.readUInt8(9);
  packetHeaderChunk.frame_id = packetHeaderChunk.chunk_data.readUInt8(10);
  packetHeaderChunk.frame_packet_count = packetHeaderChunk.chunk_data.readUInt8(11);
}

module.exports = (buffer) => chunk(buffer, decodePacketHeaderChunk);
