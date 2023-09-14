module.exports = (buffer) => {
  const trackerList = {
    trackers: [],
  };

  // TODO(jwetzell): add error handling
  let offset = 0;
  while (offset < buffer.length) {
    const trackerChunk = {};
    trackerChunk.id = buffer.readUInt16LE(offset);
    offset += 2;

    // NOTE(jwetzell): this data is split up as 1 bit for has_subchunks and 15 bits for the data_len
    const tempBytesAsBinary = buffer.readUInt16LE(offset).toString(2);
    trackerChunk.has_subchunks = tempBytesAsBinary.charAt(0) === '0';
    trackerChunk.data_len = parseInt(tempBytesAsBinary.substring(1), 2);
    offset += 2;
    trackerChunk.data = buffer.subarray(offset, offset + trackerChunk.data_len);
    offset += trackerChunk.data_len;
    trackerList.trackers.push(trackerChunk);
  }

  return trackerList;
};
