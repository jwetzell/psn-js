module.exports = (id, chunkData, hasSubchunks) => {
  if (chunkData.length > 0x7fff) {
    throw new Error('chunkData can not be greater than 32767 bytes');
  }

  const header = Buffer.alloc(4);
  header.writeUInt16LE(id);
  const chunkLengthBinaryString = chunkData.length.toString(2).padStart(15, '0');
  const secondByteBinary = `${hasSubchunks ? '1' : '0'}${chunkLengthBinaryString}`;
  header.writeUInt16LE(parseInt(secondByteBinary, 2), 2);

  return Buffer.concat([header, chunkData]);
};
