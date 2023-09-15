import chunk from '../chunk';

export default (packetHeaderChunk: Buffer, systemNameChunk: Buffer, trackerListChunk: Buffer): Buffer =>
  chunk(0x6756, Buffer.concat([packetHeaderChunk, systemNameChunk, trackerListChunk]), true);
