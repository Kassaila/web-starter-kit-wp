/**
 * Build html from templates
 */

const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');

const env = require('../helpers/env');
const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

env.init({ path: process.env.ENV_PATH });

module.exports = function () {
  const sortEnv = env.sort(process.env);

  return (done) =>
    gulp
      .src([`./${global.buildHtml.templates}/*.html`, `./${global.buildHtml.templates}/*.njk`])
      .pipe(nunjucks.compile({ env: sortEnv }))
      .on('error', (error) => notifier.error(error.message, 'HTML compiling error', done))
      .pipe(gulp.dest(`../${global.folder.build}`));
};
