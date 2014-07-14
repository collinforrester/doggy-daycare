var loopback = require('loopback');
var config = {
  connector: loopback.Memory
};

try {
  module.exports = loopback.createDataSource(config);
} catch (e) {
  console.error('Error while initializing the data source:');
  console.error(e.stack);
  console.error('\nPlease check your configuration settings and try again.');
  process.exit(1);
}

process.nextTick(function () {
  // import data
  require('../test-data/import');
});
