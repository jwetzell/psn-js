const chunk = require('../chunk');

module.exports = (trackerId, fieldChunks) => chunk(trackerId, Buffer.concat(fieldChunks), true);
