import { Decoders } from '.';
import { PacketHeaderChunk, PacketHeaderChunkData } from '../models/packet-header-chunk';

export default (buffer: Uint8Array): PacketHeaderChunk => {
  const chunk = Decoders.Chunk(buffer);

  const view = new DataView(chunk.chunkData.buffer, chunk.chunkData.byteOffset, chunk.chunkData.byteLength);
  const data: PacketHeaderChunkData = {
    packetTimestamp: view.getBigUint64(0, true),
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
