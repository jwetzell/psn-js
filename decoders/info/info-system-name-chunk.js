const Parser = require('binary-parser').Parser;

module.exports = new Parser().string('system_name', { greedy: true });
