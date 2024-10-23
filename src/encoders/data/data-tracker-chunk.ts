import chunk from '../chunk';

export default (trackerId: number, fieldChunks: Uint8Array[]): Uint8Array => {
  let fieldChunksTotalLength = 0;

  fieldChunks.forEach((fieldChunk) => {
    fieldChunksTotalLength += fieldChunk.length;
  });

  const fieldChunksBytes = new Uint8Array(fieldChunksTotalLength);

  let offset = 0;

  fieldChunks.forEach((fieldChunk) => {
    fieldChunksBytes.set(fieldChunk, offset);
    offset += fieldChunk.length;
  });

  return chunk(trackerId, fieldChunksBytes, fieldChunks.length > 0);
};
