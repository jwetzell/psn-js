import { Chunk } from '../models/chunk';

export default (buffer: Uint8Array): Chunk => {
  if (buffer.length < 4) {
    throw new Error('Chunk buffer must be at least 4 bytes');
  }

  const id = (buffer[1] << 8) + buffer[0];

  // NOTE(jwetzell): this data is split up as 1 bit for hasSubchunks and 15 bits for the dataLen
  const combinedLengthAndFlag = (buffer[3] << 8) + buffer[2];
  const hasSubchunks = combinedLengthAndFlag > 32768;
  const dataLen = hasSubchunks ? combinedLengthAndFlag - 32768 : combinedLengthAndFlag;

  const header = {
    id,
    dataLen,
    hasSubchunks,
  };

  const chunkData = buffer.subarray(4, 4 + header.dataLen);

  const chunk = {
    chunkData,
    header,
  };

  return chunk;
};
