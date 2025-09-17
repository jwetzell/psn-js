import { InfoSystemNameChunk, InfoSystemNameChunkData } from '../../models/info/info-system-name-chunk.js';
import { Decoders } from '../index.js';

const nameDecoder = new TextDecoder();
export default (buffer: Uint8Array): InfoSystemNameChunk => {
  const chunk = Decoders.Chunk(buffer);

  const data: InfoSystemNameChunkData = {
    systemName: nameDecoder.decode(chunk.chunkData.subarray(0, chunk.header.dataLen)),
  };

  return {
    chunk,
    data,
  };
};
