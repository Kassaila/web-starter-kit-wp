/**
 * Build custom styles files listed in the config, without sourcemaps & Gcmq
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sortMedia = require('postcss-sort-media-queries');
const cssnano = require('cssnano');

const env = require('../helpers/env');
const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

sass.compiler = require('sass');
env.init({ path: process.env.ENV_PATH });

module.exports = function () {
  const { isSortMedia } = global.buildStyles.custom.isSortMedia;
  const plugins = [autoprefixer()];

  if (isSortMedia && process.env.NODE_ENV === 'production') {
    plugins.push(sortMedia({ sort: global.buildStyles.sortType }));
  }

  if (process.env.NODE_ENV === 'production') {
    plugins.push(cssnano());
  }

  return (done) =>
    gulp
      .src('./scss/custom/*.scss', { sourcemaps: process.env.NODE_ENV !== 'production' })
      .pipe(sass.sync({ sourceMap: process.env.NODE_ENV !== 'production' }))
      .on('error', (error) => notifier.error(error.message, 'Custom Sass compiling error', done))
      .pipe(postcss(plugins))
      .on('error', (error) => notifier.error(error.message, 'Custom PostCSS compiling error', done))
      .pipe(gulp.dest(`../${global.folder.build}/css`, { sourcemaps: './' }));
};
