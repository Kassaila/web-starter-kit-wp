/**
 * Build js
 */

const env = require('../helpers/env');
const webpack = require('webpack');
const path = require('path');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

env({ path: process.env.DOTENV_CONFIG_PATH });

module.exports = function () {
  return (done) => {
    try {
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
            'process.env': JSON.stringify(process.env),
          }),
        ],
      };

      webpack(config, (error, stats) => {
        if (error) {
          throw new Error(error);
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
    } catch (error) {
      notifier.error(error, 'JS compiling error', done);
    }
  };
};
