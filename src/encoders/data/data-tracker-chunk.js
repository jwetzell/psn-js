const chunk = require('../chunk');

module.exports = (trackerId, fieldChunks) => chunk(trackerId, Buffer.concat(fieldChunks), fieldChunks.length > 0);
