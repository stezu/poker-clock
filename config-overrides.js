const path = require('path');

const { injectBabelPlugin } = require('react-app-rewired');
const rewireEmotion = require('react-app-rewire-emotion');

// Add an alias for easy module resolution throughout the source files
function rewireAlias(config) {
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};

  config.resolve.alias['@'] = path.resolve('./src');

  return config;
}

// Add the `polished` babel plugin which removes the runtime dependency
function rewirePolished(config) {
  return injectBabelPlugin(['polished'], config);
}

module.exports = function override(config, env) {
  config = rewireEmotion(config, env, { inline: true });
  config = rewireAlias(config);
  config = rewirePolished(config);

  return config;
};
