import { Decoders } from '..';
import { Constants } from '../../constants';
import { InfoTrackerChunk } from '../../models/info/info-tracker-chunk';
import { InfoTrackerListChunk, InfoTrackerListChunkData } from '../../models/info/info-tracker-list-chunk';

export default (buffer: Uint8Array): InfoTrackerListChunk => {
  const chunk = Decoders.Chunk(buffer);

  const trackers: InfoTrackerChunk[] = [];

  if (chunk.header.hasSubchunks && chunk.chunkData) {
    let offset = 0;
    if (chunk.header.dataLen) {
      while (offset < chunk.header.dataLen) {
        const trackerChunk = Decoders.InfoTrackerChunk(chunk.chunkData.subarray(offset));
        offset += Constants.CHUNK_HEADER_SIZE;
        if (trackerChunk.chunk.header.dataLen) {
          offset += trackerChunk.chunk.header.dataLen;
        }
        if (trackerChunk.chunk.header.id !== undefined) {
          trackers.push(trackerChunk);
        }
      }
    }
  }
  const data: InfoTrackerListChunkData = {
    trackers,
  };
  return {
    chunk,
    data,
  };
};
