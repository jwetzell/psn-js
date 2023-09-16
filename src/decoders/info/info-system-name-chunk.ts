import { Decoders } from '..';
import { InfoSystemNameChunk } from '../../models/info/info-system-name-chunk';

function decodeSystemNameChunk(systemNameChunk: InfoSystemNameChunk) {
  if (systemNameChunk.chunk_data !== undefined && systemNameChunk.data_len !== undefined) {
    systemNameChunk.system_name = systemNameChunk.chunk_data.subarray(0, systemNameChunk.data_len).toString();
  }
}

export default (buffer: Buffer): InfoSystemNameChunk =>
  Decoders.Chunk(buffer, decodeSystemNameChunk) as InfoSystemNameChunk;
