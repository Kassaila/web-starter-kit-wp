/**
 * Build html from templates
 */

const env = require('../helpers/env');
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

env({ path: process.env.DOTENV_CONFIG_PATH });

module.exports = function () {
  return (done) =>
    gulp
      .src([`./${global.buildHtml.templates}/*.html`, `./${global.buildHtml.templates}/*.njk`])
      .pipe(nunjucks.compile({ 'process.env': process.env }))
      .on('error', (error) => notifier.error(error.message, 'HTML compiling error', done))
      .pipe(gulp.dest(`../${global.folder.build}`));
};
