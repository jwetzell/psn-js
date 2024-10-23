import chunk from '../chunk';
export default (packetHeaderChunk: Uint8Array, trackerListChunk: Uint8Array): Uint8Array => {
  const chunkData = new Uint8Array(packetHeaderChunk.length + trackerListChunk.length);
  chunkData.set(packetHeaderChunk);
  chunkData.set(trackerListChunk, packetHeaderChunk.length);
  return chunk(0x6755, chunkData, true);
};
