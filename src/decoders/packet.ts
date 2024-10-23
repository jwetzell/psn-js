import { Decoders } from '.';
import { DataPacketChunk } from '../models/data/data-packet-chunk';
import { InfoPacketChunk } from '../models/info/info-packet-chunk';

export default (buffer: Uint8Array): InfoPacketChunk | DataPacketChunk | undefined => {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const chunkId = view.getUint16(0, true);

  switch (chunkId) {
    case 0x6756:
      return Decoders.InfoPacketChunk(buffer);
    case 0x6755:
      return Decoders.DataPacketChunk(buffer);
    default:
      return undefined;
  }
};
