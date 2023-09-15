import infoPacketChunk, { InfoPacketChunk } from './info/info-packet-chunk';

import dataPacketChunk, { DataPacketChunk } from './data/data-packet-chunk';

export default (buffer: Buffer): InfoPacketChunk | DataPacketChunk | undefined => {
  const chunkId = buffer.readUInt16LE();
  switch (chunkId) {
    case 0x6756:
      return infoPacketChunk(buffer);
    case 0x6755:
      return dataPacketChunk(buffer);
    default:
      return undefined;
  }
};
