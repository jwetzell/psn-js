const header = new DataView(new ArrayBuffer(4));
export default (id: number, chunkData: Uint8Array, hasSubchunks: boolean): Uint8Array => {
  if (!Number.isInteger(id)) {
    throw new Error('chunk id must be an integer');
  }

  if (id > 0xffff || id < 0) {
    throw new Error('chunk id must be >= 0 and <= 65535');
  }

  if (chunkData.length > 0x7fff) {
    throw new Error('chunkData can not be greater than 32767 bytes');
  }

  header.setUint16(0, id, true);
  const hasSubChunksBit = (hasSubchunks ? 1 : 0) << 15;
  header.setUint16(2, hasSubChunksBit + chunkData.length, true);

  const headerBytes = new Uint8Array(header.buffer);

  const bytes = new Uint8Array(headerBytes.length + chunkData.length);
  bytes.set(headerBytes);
  bytes.set(chunkData, headerBytes.length);
  return bytes;
};
