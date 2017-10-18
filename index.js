if (typeof window === 'undefined') {
  console.log('node');
  // module.exports.Plugin = require('./server/plugin');
} else {
  console.log('browser');
}
