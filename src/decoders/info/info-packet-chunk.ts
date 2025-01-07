import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoPacketChunk, InfoPacketChunkData } from '../../models/info/info-packet-chunk';

export default (buffer: Uint8Array): InfoPacketChunk => {
  const chunk = Decoders.Chunk(buffer);

  const data: InfoPacketChunkData = {};

  if (chunk.header.hasSubchunks && chunk.chunkData && chunk.header.dataLen) {
    let offset = 0;
    while (offset < chunk.header.dataLen) {
      const view = new DataView(chunk.chunkData.buffer, chunk.chunkData.byteOffset, chunk.chunkData.byteLength);
      const chunkId = view.getUint16(offset, true);
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
