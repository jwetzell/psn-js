import { PacketHeaderChunk, PacketHeaderChunkData } from '../models/packet-header-chunk.js';
import { Decoders } from './index.js';

export default (buffer: Uint8Array): PacketHeaderChunk => {
  const chunk = Decoders.Chunk(buffer);

  let packetTimestamp = BigInt(chunk.chunkData[7]) << BigInt(56);
  packetTimestamp += BigInt(chunk.chunkData[6]) << BigInt(48);
  packetTimestamp += BigInt(chunk.chunkData[5]) << BigInt(40);
  packetTimestamp += BigInt(chunk.chunkData[4]) << BigInt(32);
  packetTimestamp += BigInt(chunk.chunkData[3]) << BigInt(24);
  packetTimestamp += BigInt(chunk.chunkData[2]) << BigInt(16);
  packetTimestamp += BigInt(chunk.chunkData[1]) << BigInt(8);
  packetTimestamp += BigInt(chunk.chunkData[0]);
  const data: PacketHeaderChunkData = {
    packetTimestamp,
    versionHigh: chunk.chunkData[8],
    versionLow: chunk.chunkData[9],
    frameId: chunk.chunkData[10],
    framePacketCount: chunk.chunkData[11],
  };

  return {
    chunk,
    data,
  };
};
