const { useEslintRc } = require('customize-cra');

const getEslintRule = config =>
  config.module.rules.filter(
    r => r.use && r.use.some(u => u.options && u.options.useEslintrc !== void 0)
  )[0];

module.exports = function({ config }) {
  config.resolve.modules = config.resolve.modules.concat(['src']);

  const eslintRule = getEslintRule(config);

  eslintRule.use.push({
    loader: require.resolve('stylelint-custom-processor-loader')
  });

  return useEslintRc()(config);
};
