/**
 * Watch for file changes
 */

const gulp = require('gulp');

const global = require('../gulp-config.js');

module.exports = function (options) {
  return () => {
    gulp.watch(['./html/**/*.njk', './html/**/*.html'], gulp.series('build-html', 'lint-html'));

    gulp.watch(
      ['./scss/**/*.scss', '!./scss/custom/**/*.scss'],
      gulp.series('lint-styles', 'build-styles')
    );

    gulp.watch('./scss/custom/**/*.scss', gulp.series('lint-styles', 'build-styles-custom'));

    gulp.watch('./js/**/*.js', gulp.series('lint-js', 'build-js'));

    gulp.watch('./vendor_entries/**/*.js', gulp.series('build-js'));

    gulp.watch('./vendor_entries/**/*.scss', gulp.series('build-styles-vendors'));

    gulp
      .watch([`../${global.folder.build}/**/*`, `!../${global.folder.build}/**/*.map`])
      .on('change', options.browserSyncInstance.reload)
      .on('unlink', options.browserSyncInstance.reload)
      .on('add', options.browserSyncInstance.reload);
  };
};
