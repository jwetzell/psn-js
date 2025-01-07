import { Decoders } from '..';
import { Constants } from '../../constants';
import { DataTrackerChunk } from '../../models';
import { DataTrackerListChunk, DataTrackerListChunkData } from '../../models/data/data-tracker-list-chunk';

export default (buffer: Uint8Array): DataTrackerListChunk => {
  const chunk = Decoders.Chunk(buffer);
  const trackers: DataTrackerChunk[] = [];

  // TODO(jwetzell): add error handling
  if (chunk.chunkData) {
    let offset = 0;
    while (offset < chunk.chunkData.length) {
      const trackerChunk = Decoders.DataTrackerChunk(chunk.chunkData.subarray(offset));
      offset += Constants.CHUNK_HEADER_SIZE;
      if (trackerChunk.chunk.header.dataLen) {
        offset += trackerChunk.chunk.header.dataLen;
      }
      if (trackerChunk.chunk.header.id !== undefined) {
        trackers.push(trackerChunk);
      }
    }
  }

  const data: DataTrackerListChunkData = {
    trackers,
  };

  return {
    chunk,
    data,
  };
};
