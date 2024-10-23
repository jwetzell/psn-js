import { Chunk } from '../models/chunk';

export default (buffer: Uint8Array, dataDecoder: Function): Chunk => {
  let offset = 0;
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const chunk: Chunk = {};
  chunk.id = view.getUint16(offset, true);
  offset += 2;

  // NOTE(jwetzell): this data is split up as 1 bit for has_subchunks and 15 bits for the data_len
  const combinedLengthAndFlag = view.getUint16(offset, true);
  chunk.has_subchunks = combinedLengthAndFlag > 32768;
  chunk.data_len = chunk.has_subchunks ? combinedLengthAndFlag - 32768 : combinedLengthAndFlag;
  offset += 2;
  chunk.chunk_data = buffer.slice(offset, offset + chunk.data_len);

  dataDecoder(chunk);
  return chunk;
};
