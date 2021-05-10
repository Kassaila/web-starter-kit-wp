/**
 * Build js
 */

const path = require('path');
const webpack = require('webpack');

const env = require('../helpers/env');
const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

env.init({ path: process.env.ENV_PATH });

module.exports = function () {
  const sortEnv = env.sort(process.env);
  const config = {
    mode: 'none',
    entry: global.buildJs.getEntryPoints(),
    output: {
      path: path.resolve(`../${global.folder.build}`, 'js/'),
      filename: '[name].js',
    },
    target: 'browserslist',
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/](node_modules|vendor_entries)[\\/]/,
            filename: `${global.file.js.vendor}.js`,
          },
        },
      },
      minimize: process.env.NODE_ENV === 'production',
    },
    resolve: {
      alias: {
        '@js': path.resolve(__dirname, '../js'),
        '@vendor': path.resolve(__dirname, '../vendor_entries/js'),
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    externals: global.buildJs.externalLibs,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(sortEnv),
      }),
    ],
  };

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  }

  return (done) => {
    webpack(config, (error, stats) => {
      if (error) {
        notifier.error(error, 'JS compiling error', done);
      }

      if (process.env.NODE_ENV === 'production') {
        console.log(
          stats.toString({
            version: false,
            hash: false,
            chunks: false,
            colors: true,
          })
        );
      }

      return done();
    });
  };
};
