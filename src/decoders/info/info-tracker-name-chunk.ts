import { Decoders } from '..';
import { InfoTrackerNameChunk, InfoTrackerNameChunkData } from '../../models/info/info-tracker-name-chunk';

const nameDecoder = new TextDecoder();
export default (buffer: Uint8Array): InfoTrackerNameChunk => {
  const chunk = Decoders.Chunk(buffer);

  const data: InfoTrackerNameChunkData = {
    trackerName: nameDecoder.decode(chunk.chunkData.subarray(0, chunk.header.dataLen)),
  };

  return {
    chunk,
    data,
  };
};
