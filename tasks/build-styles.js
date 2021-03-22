/**
 * Build styles for application from SASS
 */

const env = require('../helpers/env');
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sortMedia = require('postcss-sort-media-queries');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

env({ path: process.env.DOTENV_CONFIG_PATH });
sass.compiler = require('sass');

module.exports = function () {
  const plugins = [autoprefixer()];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(sortMedia({ sort: global.buildStyles.sortType }));
  }

  return (done) =>
    gulp
      .src('./scss/*.scss', { sourcemaps: process.env.NODE_ENV === 'production' })
      .pipe(sass.sync({ sourceMap: process.env.NODE_ENV === 'production' }))
      .on('error', (error) => notifier.error(error.message, 'Main Sass compiling error', done))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`../${global.folder.build}/css`, { sourcemaps: './' }));
};
