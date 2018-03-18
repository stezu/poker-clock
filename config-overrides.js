const path = require('path');

const rewireEmotion = require('react-app-rewire-emotion');

function rewireAlias(config) {
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};

  config.resolve.alias['@'] = path.resolve('./src');

  return config;
}

module.exports = function override(config, env) {
  config = rewireEmotion(config, env, { inline: true });
  config = rewireAlias(config);

  return config;
};
