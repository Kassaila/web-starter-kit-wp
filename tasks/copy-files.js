/**
 * Copy folders to the build folder
 */
'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');

const global = require('../gulp-config.js');

module.exports = function() {
  const filesList = global.getFilesToCopy();

  return () => {
    return gulp.src(filesList, { dot: true, buffer: false })
      .pipe(newer(`../${global.folder.build}`))
      .pipe(gulp.dest(`../${global.folder.build}`));
  };
};
