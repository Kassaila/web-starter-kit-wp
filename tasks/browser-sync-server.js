/**
 * Start browserSync server
 */

const fs = require('fs');

const global = require('../gulp-config.js');

module.exports = function (options) {
  return () => {
    options.browserSyncInstance.init({
      open: false,
      notify: false,
      injectChanges: false,
      minify: false,
      server: {
        baseDir: `../${global.folder.build}`,
        // If index.html exist - open it, else show folder
        directory: !fs.existsSync(`../${global.folder.build}/${global.file.html.main}`),
      },
      port: 8080,
    });
  };
};
