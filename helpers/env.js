const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

module.exports = {
  init(config) {
    const dotenvConfig = dotenv.config(config);

    dotenvExpand(dotenvConfig);
  },
  sort(env) {
    return Object.fromEntries(Object.entries(env).filter(([key, val]) => /WSK_/.test(key)));
  },
};
