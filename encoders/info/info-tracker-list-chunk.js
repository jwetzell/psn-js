const chunk = require('../chunk');

module.exports = (trackerChunks) => chunk(0x0002, Buffer.concat(trackerChunks), true);
