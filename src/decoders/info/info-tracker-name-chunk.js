const chunk = require('../chunk');

function decodeTrackerNameChunk(trackerNameChunk) {
  if (trackerNameChunk.chunk_data !== undefined && trackerNameChunk.data_len !== undefined) {
    trackerNameChunk.tracker_name = trackerNameChunk.chunk_data.subarray(0, trackerNameChunk.data_len).toString();
  }
}
module.exports = (buffer) => chunk(buffer, decodeTrackerNameChunk);
