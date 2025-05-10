module.exports = function override(config, env) {
  if (env !== 'production') {
    return config;
  }

  // Get rid of hash for js files
  config.output.filename = 'datatek-react-demo.js';

  // Get rid of hash for css files
  const miniCssExtractPlugin = config.plugins.find(
    element => element.constructor.name === 'MiniCssExtractPlugin',
  );
  miniCssExtractPlugin.options.filename = 'datatek-react-demo.css';

  return config;
};
