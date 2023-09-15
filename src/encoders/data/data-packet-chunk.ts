import chunk from '../chunk';
export default (packetHeaderChunk: Buffer, trackerListChunk: Buffer): Buffer =>
  chunk(0x6755, Buffer.concat([packetHeaderChunk, trackerListChunk]), true);
