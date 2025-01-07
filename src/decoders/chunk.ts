import { Chunk } from '../models/chunk';

export default (buffer: Uint8Array): Chunk => {
  let offset = 0;
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const id = view.getUint16(offset, true);
  offset += 2;

  // NOTE(jwetzell): this data is split up as 1 bit for has_subchunks and 15 bits for the data_len
  const combinedLengthAndFlag = view.getUint16(offset, true);
  const hasSubchunks = combinedLengthAndFlag > 32768;
  const dataLen = hasSubchunks ? combinedLengthAndFlag - 32768 : combinedLengthAndFlag;
  offset += 2;

  const header = {
    id,
    dataLen,
    hasSubchunks,
  };

  const chunkData = buffer.subarray(offset, offset + header.dataLen);

  const chunk = {
    chunkData,
    header,
  };

  return chunk;
};
