import { Chunk } from './chunk';

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
