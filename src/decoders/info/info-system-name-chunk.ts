import { Decoders } from '..';
import { InfoSystemNameChunk } from '../../models/info/info-system-name-chunk';

function decodeSystemNameChunk(systemNameChunk: InfoSystemNameChunk) {
  if (systemNameChunk.chunk_data !== undefined && systemNameChunk.data_len !== undefined) {
    systemNameChunk.system_name = new TextDecoder().decode(
      systemNameChunk.chunk_data.slice(0, systemNameChunk.data_len)
    );
  }
}

export default (buffer: Uint8Array): InfoSystemNameChunk =>
  Decoders.Chunk(buffer, decodeSystemNameChunk) as InfoSystemNameChunk;
