/**
 *
 *  Web Starter Kit
 *  Copyright (c) 2020 JustCoded.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:

 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */

require('dotenv').config();
const gulp = require('gulp');
const browserSyncInstance = require('browser-sync').create();

// Tasks modules
const loadEnv = require('./tasks/load-env');
const cleanBuild = require('./tasks/clean-build');
const lintHtml = require('./tasks/lint-html');
const buildHtml = require('./tasks/build-html');
const lintStyles = require('./tasks/lint-styles');
const buildStyles = require('./tasks/build-styles');
const buildStylesCustom = require('./tasks/build-styles-custom');
const buildStylesVendors = require('./tasks/build-styles-vendors');
const lintJs = require('./tasks/lint-js');
const buildJs = require('./tasks/build-js');
const browserSync = require('./tasks/browser-sync-server');
const watch = require('./tasks/watch');

/**
 * Initialize .env files
 */
gulp.task('load-env', loadEnv());
/**
 * Clean build folders
 */
gulp.task('clean-build', cleanBuild());
/**
 * Lint HTML
 */
gulp.task('lint-html', lintHtml());

/**
 * Template HTML
 */
gulp.task('build-html', buildHtml());

/**
 * Lint styles
 */
gulp.task('lint-styles', lintStyles());

/**
 * Build styles for application
 */
gulp.task('build-styles', buildStyles());

/**
 * Build custom styles files listed in the config, without sourcemaps & Gcmq
 */
gulp.task('build-styles-custom', buildStylesCustom());

/**
 * Build styles for vendor
 */
gulp.task('build-styles-vendors', buildStylesVendors());

/**
 * Lint JS
 */
gulp.task('lint-js', lintJs());

/**
 * Build JS
 */
gulp.task('build-js', buildJs());

/**
 * Start browserSync server
 */
gulp.task('browser-sync', browserSync({ browserSyncInstance }));

/**
 * Watch for file changes
 */
gulp.task('watch', watch({ browserSyncInstance }));

/**
 * Develop mode - with browser sync, file watch & live reload
 */
gulp.task(
  'default',
  gulp.series(
    'clean-build',
    'lint-js',
    'lint-styles',
    gulp.parallel(
      gulp.series('build-html', 'lint-html'),
      gulp.series('build-styles', 'build-styles-custom', 'build-styles-vendors'),
      gulp.series('build-js')
    ),
    gulp.parallel('browser-sync', 'watch')
  )
);

/**
 * Production mode - creating production folder without unnecessary files
 */
gulp.task(
  'build',
  gulp.series(
    'clean-build',
    'lint-js',
    'lint-styles',
    gulp.parallel(
      gulp.series('build-html', 'lint-html'),
      gulp.series('build-styles', 'build-styles-custom', 'build-styles-vendors'),
      gulp.series('build-js')
    )
  )
);
