import { Constants } from '../../constants.js';
import { InfoPacketChunk, InfoPacketChunkData } from '../../models/info/info-packet-chunk.js';
import { Decoders } from '../index.js';

export default (buffer: Uint8Array): InfoPacketChunk => {
  const chunk = Decoders.Chunk(buffer);

  const data: InfoPacketChunkData = {};

  if (chunk.header.hasSubchunks && chunk.chunkData && chunk.header.dataLen) {
    let offset = 0;
    while (offset < chunk.header.dataLen) {
      const chunkId = (chunk.chunkData.subarray(offset)[1] << 8) + chunk.chunkData.subarray(offset)[0];
      switch (chunkId) {
        case 0x0000:
          data.packetHeader = Decoders.PacketHeaderChunk(chunk.chunkData.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (data.packetHeader?.chunk.header.dataLen) {
            offset += data.packetHeader.chunk.header.dataLen;
          }
          break;
        case 0x0001:
          data.systemName = Decoders.InfoSystemNameChunk(chunk.chunkData.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (data.systemName?.chunk.header.dataLen) {
            offset += data.systemName?.chunk.header.dataLen;
          }
          break;
        case 0x0002:
          data.trackerList = Decoders.InfoTrackerListChunk(chunk.chunkData.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (data.trackerList?.chunk.header.dataLen) {
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
