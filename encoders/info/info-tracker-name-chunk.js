const chunk = require('../chunk');

module.exports = (trackerName) => chunk(0x0000, Buffer.from(trackerName), false);
