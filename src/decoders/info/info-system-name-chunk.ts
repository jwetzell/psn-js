import chunk, { Chunk } from '../chunk';

export interface InfoSystemNameChunk extends Chunk {
  system_name: string;
}

function decodeSystemNameChunk(systemNameChunk: InfoSystemNameChunk) {
  if (systemNameChunk.chunk_data !== undefined && systemNameChunk.data_len !== undefined) {
    systemNameChunk.system_name = systemNameChunk.chunk_data.subarray(0, systemNameChunk.data_len).toString();
  }
}

export default (buffer: Buffer): InfoSystemNameChunk => chunk(buffer, decodeSystemNameChunk) as InfoSystemNameChunk;
