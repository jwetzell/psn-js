import chunk from '../chunk.js';

export default (
  packetHeaderChunk: Uint8Array,
  systemNameChunk: Uint8Array,
  trackerListChunk: Uint8Array
): Uint8Array => {
  const chunkData = new Uint8Array(packetHeaderChunk.length + systemNameChunk.length + trackerListChunk.length);

  chunkData.set(packetHeaderChunk);
  chunkData.set(systemNameChunk, packetHeaderChunk.length);
  chunkData.set(trackerListChunk, packetHeaderChunk.length + systemNameChunk.length);
  return chunk(0x6756, chunkData, true);
};
