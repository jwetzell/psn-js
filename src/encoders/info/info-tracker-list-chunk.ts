import chunk from '../chunk';

export default (trackerChunks: Uint8Array[]): Uint8Array => {
  let trackerChunksTotalLength = 0;

  trackerChunks.forEach((trackerChunk) => {
    trackerChunksTotalLength += trackerChunk.length;
  });

  const trackerChunksBytes = new Uint8Array(trackerChunksTotalLength);

  let offset = 0;

  trackerChunks.forEach((trackerChunk) => {
    trackerChunksBytes.set(trackerChunk, offset);
    offset += trackerChunk.length;
  });
  return chunk(0x0002, trackerChunksBytes, true);
};
