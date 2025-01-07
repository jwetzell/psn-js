import { Decoders } from '..';
import { InfoSystemNameChunk, InfoSystemNameChunkData } from '../../models/info/info-system-name-chunk';

export default (buffer: Uint8Array): InfoSystemNameChunk => {
  const chunk = Decoders.Chunk(buffer);

  const data: InfoSystemNameChunkData = {
    systemName: new TextDecoder().decode(chunk.chunkData.subarray(0, chunk.header.dataLen)),
  };

  return {
    chunk,
    data,
  };
};
