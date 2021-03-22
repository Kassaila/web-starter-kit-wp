/**
 * Load .env files
 */

const gulp = require('gulp');
const rename = require('gulp-rename');

module.exports = function () {
  return () =>
    gulp
      .src('.env*.example')
      .pipe(
        rename((path) => {
          return {
            dirname: `${path.dirname}`,
            basename: `${path.basename}`,
            extname: '',
          };
        })
      )
      .pipe(gulp.dest('.', { overwrite: false }));
};
