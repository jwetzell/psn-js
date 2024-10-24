import { Decoders } from '..';
import { Constants } from '../../constants';
import { DataPacketChunk } from '../../models/data/data-packet-chunk';

function decodeDataPacketChunk(dataPacketChunk: DataPacketChunk) {
  if (dataPacketChunk.has_subchunks && dataPacketChunk.chunk_data && dataPacketChunk.data_len) {
    let offset = 0;
    while (offset < dataPacketChunk.data_len) {
      const view = new DataView(
        dataPacketChunk.chunk_data.buffer,
        dataPacketChunk.chunk_data.byteOffset,
        dataPacketChunk.chunk_data.byteLength
      );
      const chunkId = view.getUint16(offset, true);
      switch (chunkId) {
        case 0x0000:
          dataPacketChunk.packet_header = Decoders.PacketHeaderChunk(dataPacketChunk.chunk_data.slice(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (dataPacketChunk.packet_header?.data_len) {
            offset += dataPacketChunk.packet_header.data_len;
          }
          break;
        case 0x0001:
          dataPacketChunk.tracker_list = Decoders.DataTrackerListChunk(dataPacketChunk.chunk_data.slice(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (dataPacketChunk.tracker_list.data_len) {
            offset += dataPacketChunk.tracker_list.data_len;
          }
          break;
        default:
          break;
      }
    }
  }
}

export default (buffer: Uint8Array): DataPacketChunk =>
  Decoders.Chunk(buffer, decodeDataPacketChunk) as DataPacketChunk;
