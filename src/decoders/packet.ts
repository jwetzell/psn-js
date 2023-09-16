import { Decoders } from '.';
import { DataPacketChunk } from '../models/data/data-packet-chunk';
import { InfoPacketChunk } from '../models/info/info-packet-chunk';

export default (buffer: Buffer): InfoPacketChunk | DataPacketChunk | undefined => {
  const chunkId = buffer.readUInt16LE();
  switch (chunkId) {
    case 0x6756:
      return Decoders.InfoPacketChunk(buffer);
    case 0x6755:
      return Decoders.DataPacketChunk(buffer);
    default:
      return undefined;
  }
};
