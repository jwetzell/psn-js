import { Chunk } from '../models/chunk';

export default (buffer: Buffer, dataDecoder: Function): Chunk => {
  let offset = 0;
  const chunk: Chunk = {};
  chunk.id = buffer.readUInt16LE(offset);
  offset += 2;

  // NOTE(jwetzell): this data is split up as 1 bit for has_subchunks and 15 bits for the data_len
  const combinedLengthAndFlag = buffer.readUInt16LE(offset);
  chunk.has_subchunks = combinedLengthAndFlag > 32768;
  chunk.data_len = chunk.has_subchunks ? combinedLengthAndFlag - 32768 : combinedLengthAndFlag;
  offset += 2;
  chunk.chunk_data = buffer.subarray(offset, offset + chunk.data_len);

  dataDecoder(chunk);
  return chunk;
};
