import { Chunk } from './chunk.js';

export interface PacketHeaderChunkData {
  packetTimestamp: bigint;
  versionHigh: number;
  versionLow: number;
  frameId: number;
  framePacketCount: number;
}

export interface PacketHeaderChunk {
  chunk: Chunk;
  data: PacketHeaderChunkData;
}
