/**
 * Lint styles
 */
const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');

module.exports = function () {
  return () =>
    gulp.src('scss/**/*.scss').pipe(
      gulpStylelint({
        failAfterError: false,
        reporters: [{ formatter: 'string', console: true }],
      })
    );
};
