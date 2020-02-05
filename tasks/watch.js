/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function (options) {

  return () => {
    gulp.watch(`js/**/*`, gulp.series(options.tasks.lintJs, options.tasks.buildJs));

    gulp.watch(`scss/**/*`, gulp.series(options.tasks.buildStyles, options.tasks.buildStylesCustom));

    gulp.watch(`html/**/*`, gulp.series(options.tasks.buildHtml, options.tasks.lintHtml));

    gulp.watch(`vendor_entries/vendor.js`, gulp.series(options.tasks.buildJsVendors));

    gulp.watch(`vendor_entries/vendor.scss`, gulp.series(options.tasks.buildStylesVendors));

    gulp.watch([`../${options.dir}/**/*`, `!../${options.dir}/css/*.map`])
      .on('change', options.browserSync.reload);
  };
};
