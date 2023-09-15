const chunk = require('../chunk');

function decodeSystemNameChunk(systemNameChunk) {
  if (systemNameChunk.chunk_data !== undefined && systemNameChunk.data_len !== undefined) {
    systemNameChunk.system_name = systemNameChunk.chunk_data.subarray(0, systemNameChunk.data_len).toString();
  }
}

module.exports = (buffer) => chunk(buffer, decodeSystemNameChunk);
