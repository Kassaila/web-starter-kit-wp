/**
 * Build styles for vendor from SASS
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssimport = require('postcss-import');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const plugins = [cssimport()];

  return (done) =>
    gulp
      .src(`./vendor_entries/${global.file.styles.vendor}.scss`)
      .pipe(sass.sync())
      .on('error', (error) => notifier.error(error.message, 'Vendor Sass compiling error', done))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`../${global.folder.build}/css`));
};
