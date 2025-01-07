import { Decoders } from '..';
import { InfoTrackerNameChunk, InfoTrackerNameChunkData } from '../../models/info/info-tracker-name-chunk';

export default (buffer: Uint8Array): InfoTrackerNameChunk => {
  const chunk = Decoders.Chunk(buffer);

  const data: InfoTrackerNameChunkData = {
    trackerName: new TextDecoder().decode(chunk.chunkData.subarray(0, chunk.header.dataLen)),
  };

  return {
    chunk,
    data,
  };
};
