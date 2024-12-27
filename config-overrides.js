module.exports = function override(config, env) {
  if (env !== 'production') {
    return config;
  }

  // Get rid of hash for js files
  // config.output.path = path.join(path.dirname(__dirname), 'src/FileCabinet/SuiteScripts/wenco-order-entry');
  config.output.filename = 'datatek-starter-kit.js';

  // Get rid of hash for css files
  const miniCssExtractPlugin = config.plugins.find(
    element => element.constructor.name === 'MiniCssExtractPlugin',
  );
  miniCssExtractPlugin.options.filename = 'datatek-starter-kit.css';

  return config;
};
