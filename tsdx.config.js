const image = require('@rollup/plugin-image');

module.exports = {
  rollup(config, options) {
    config.plugins.unshift(image());
    return config;
  },
};
