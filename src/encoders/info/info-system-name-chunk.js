const chunk = require('../chunk');

module.exports = (systemName) => chunk(0x0001, Buffer.from(systemName), false);
