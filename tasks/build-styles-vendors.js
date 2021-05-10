/**
 * Build styles for vendor from SASS
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssimport = require('postcss-import');
const cssnano = require('cssnano');

const env = require('../helpers/env');
const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

sass.compiler = require('sass');
env.init({ path: process.env.ENV_PATH });

module.exports = function () {
  const plugins = [cssimport()];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(cssnano());
  }

  return (done) =>
    gulp
      .src(`./vendor_entries/css/${global.file.styles.vendor}.scss`)
      .pipe(sass.sync())
      .on('error', (error) => notifier.error(error.message, 'Vendor Sass compiling error', done))
      .pipe(postcss(plugins))
      .on('error', (error) => notifier.error(error.message, 'Vendor PostCSS compiling error', done))
      .pipe(gulp.dest(`../${global.folder.build}/css`));
};
