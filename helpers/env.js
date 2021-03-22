const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

module.exports = function (config) {
  const dotenvConfig = dotenv.config(config);

  dotenvExpand(dotenvConfig);
};
