export default (id: number, chunkData: Buffer, hasSubchunks: boolean): Buffer => {
  if (!Number.isInteger(id)) {
    throw new Error('chunk id must be an integer');
  }

  if (id > 0xffff || id < 0) {
    throw new Error('chunk id must be >= 0 and <= 65535');
  }

  if (chunkData.length > 0x7fff) {
    throw new Error('chunkData can not be greater than 32767 bytes');
  }

  const header = Buffer.alloc(4);
  header.writeUInt16LE(id);
  const hasSubChunksBit = (hasSubchunks ? 1 : 0) << 15;
  header.writeUInt16LE(hasSubChunksBit + chunkData.length, 2);

  return Buffer.concat([header, chunkData]);
};
