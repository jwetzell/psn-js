import { Constants } from '../../constants';
import chunk, { Chunk } from '../chunk';
import packetHeaderChunk, { PacketHeaderChunk } from '../packet-header-chunk';
import dataTrackerListChunk, { DataTrackerListChunk } from './data-tracker-list-chunk';

export interface DataPacketChunk extends Chunk {
  packet_header: PacketHeaderChunk;
  tracker_list: DataTrackerListChunk;
}

function decodeDataPacketChunk(dataPacketChunk: DataPacketChunk) {
  if (dataPacketChunk.has_subchunks && dataPacketChunk.chunk_data && dataPacketChunk.data_len) {
    let offset = 0;
    while (offset < dataPacketChunk.data_len) {
      const chunkId = dataPacketChunk.chunk_data.readUInt16LE(offset);
      switch (chunkId) {
        case 0x0000:
          dataPacketChunk.packet_header = packetHeaderChunk(dataPacketChunk.chunk_data.subarray(offset));
          offset += Constants.CHUNK_HEADER_SIZE;
          if (dataPacketChunk.packet_header?.data_len) {
            offset += dataPacketChunk.packet_header.data_len;
          }
          break;
        case 0x0001:
          dataPacketChunk.tracker_list = dataTrackerListChunk(dataPacketChunk.chunk_data.subarray(offset));
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

export default (buffer: Buffer): DataPacketChunk => chunk(buffer, decodeDataPacketChunk) as DataPacketChunk;
