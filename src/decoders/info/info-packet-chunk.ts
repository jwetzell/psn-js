import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoPacketChunk } from '../../models/info/info-packet-chunk';

function decodeInfoPacketChunk(infoPacketChunk: InfoPacketChunk) {
  if (infoPacketChunk.has_subchunks && infoPacketChunk.chunk_data && infoPacketChunk.data_len) {
    let offset = 0;
    while (offset < infoPacketChunk.data_len) {
      const view = new DataView(
        infoPacketChunk.chunk_data.buffer,
        infoPacketChunk.chunk_data.byteOffset,
        infoPacketChunk.chunk_data.byteLength
      );
      const chunkId = view.getUint16(offset, true);
      switch (chunkId) {
        case 0x0000:
          infoPacketChunk.packet_header = Decoders.PacketHeaderChunk(infoPacketChunk.chunk_data.slice(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (infoPacketChunk.packet_header?.data_len) {
            offset += infoPacketChunk.packet_header.data_len;
          }
          break;
        case 0x0001:
          infoPacketChunk.system_name = Decoders.InfoSystemNameChunk(infoPacketChunk.chunk_data.slice(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (infoPacketChunk.system_name?.data_len) {
            offset += infoPacketChunk.system_name.data_len;
          }
          break;
        case 0x0002:
          infoPacketChunk.tracker_list = Decoders.InfoTrackerListChunk(infoPacketChunk.chunk_data.slice(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (infoPacketChunk.tracker_list?.data_len) {
            offset += infoPacketChunk.tracker_list.data_len;
          }
          break;
        default:
          break;
      }
    }
  }
}

export default (buffer: Uint8Array): InfoPacketChunk =>
  Decoders.Chunk(buffer, decodeInfoPacketChunk) as InfoPacketChunk;
