export default (id: number, chunkData: Buffer, hasSubchunks: boolean): Buffer => {
  if (chunkData.length > 0x7fff) {
    throw new Error('chunkData can not be greater than 32767 bytes');
  }

  const header = Buffer.alloc(4);
  header.writeUInt16LE(id);
  const hasSubChunksBit = (hasSubchunks ? 1 : 0) << 15;
  header.writeUInt16LE(hasSubChunksBit + chunkData.length, 2);

  return Buffer.concat([header, chunkData]);
};
