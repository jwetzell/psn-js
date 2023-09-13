const chunk = require('../chunk');

module.exports = (trackerChunks) => chunk(0x0001, Buffer.concat(trackerChunks), true);
