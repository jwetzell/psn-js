import { Constants } from '../../constants';
import chunk, { Chunk } from '../chunk';
import packetHeaderChunk, { PacketHeaderChunk } from '../packet-header-chunk';
import infoSystemNameChunk, { InfoSystemNameChunk } from './info-system-name-chunk';
import infoTrackerListChunk, { InfoTrackerListChunk } from './info-tracker-list-chunk';

export interface InfoPacketChunk extends Chunk {
  packet_header: PacketHeaderChunk;
  system_name: InfoSystemNameChunk;
  tracker_list: InfoTrackerListChunk;
}

function decodeInfoPacketChunk(infoPacketChunk: InfoPacketChunk) {
  if (infoPacketChunk.has_subchunks && infoPacketChunk.chunk_data && infoPacketChunk.data_len) {
    let offset = 0;
    while (offset < infoPacketChunk.data_len) {
      const chunkId = infoPacketChunk.chunk_data.readUInt16LE(offset);
      switch (chunkId) {
        case 0x0000:
          infoPacketChunk.packet_header = packetHeaderChunk(infoPacketChunk.chunk_data.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (infoPacketChunk.packet_header?.data_len) {
            offset += infoPacketChunk.packet_header.data_len;
          }
          break;
        case 0x0001:
          infoPacketChunk.system_name = infoSystemNameChunk(infoPacketChunk.chunk_data.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (infoPacketChunk.system_name?.data_len) {
            offset += infoPacketChunk.system_name.data_len;
          }
          break;
        case 0x0002:
          infoPacketChunk.tracker_list = infoTrackerListChunk(infoPacketChunk.chunk_data.subarray(offset));
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

export default (buffer: Buffer): InfoPacketChunk => chunk(buffer, decodeInfoPacketChunk) as InfoPacketChunk;
