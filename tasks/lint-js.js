/**
 * Lint JavaScript files
 */
const { ESLint } = require('eslint');

module.exports = function () {
  const eslint = new ESLint({
    useEslintrc: true,
  });

  return async (done) => {
    const results = await eslint.lintFiles(['./js/**/*.js']);

    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);

    if (resultText !== '') console.log(resultText);

    return done();
  };
};
