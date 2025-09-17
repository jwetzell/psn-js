import { Constants } from '../../constants.js';
import { DataPacketChunk, DataPacketChunkData } from '../../models/data/data-packet-chunk.js';
import { Decoders } from '../index.js';

export default (buffer: Uint8Array): DataPacketChunk => {
  const chunk = Decoders.Chunk(buffer);

  const data: DataPacketChunkData = {};

  if (chunk.header.hasSubchunks && chunk.chunkData && chunk.header.dataLen) {
    let offset = 0;
    while (offset < chunk.header.dataLen) {
      const chunkId = (chunk.chunkData.subarray(offset)[1] << 8) + chunk.chunkData.subarray(offset)[0];
      switch (chunkId) {
        case 0x0000:
          data.packetHeader = Decoders.PacketHeaderChunk(chunk.chunkData.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (data.packetHeader.chunk.header.dataLen) {
            offset += data.packetHeader.chunk.header.dataLen;
          }
          break;
        case 0x0001:
          data.trackerList = Decoders.DataTrackerListChunk(chunk.chunkData.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (data.trackerList.chunk.header.dataLen) {
            offset += data.trackerList.chunk.header.dataLen;
          }
          break;
        default:
          break;
      }
    }
  }

  return {
    chunk,
    data,
  };
};
