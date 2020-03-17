const { useEslintRc } = require('customize-cra');
const rewireStyledComponents = require('react-app-rewire-styled-components');

const getEslintRule = config =>
  config.module.rules.filter(
    r => r.use && r.use.some(u => u.options && u.options.useEslintrc !== void 0)
  )[0];

const compose = (...funcs) => {
  return (config, env) =>
    funcs.reduce((accConfig, func) => {
      return func(accConfig, env);
    }, config);
};

const handleWebpackConfig = (config, env) => {
  config.resolve.modules = config.resolve.modules.concat(['src']);

  const eslintRule = getEslintRule(config);

  eslintRule.use.push({
    loader: require.resolve('stylelint-custom-processor-loader')
  });

  return config;
};

module.exports = function(config, env) {
  const composedConfig = compose(
    rewireStyledComponents,
    handleWebpackConfig
  )(config, env);

  return useEslintRc()(composedConfig);
};
