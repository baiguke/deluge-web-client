const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  webpack(config) {
    return {
      ...config,
      plugins: [...config.plugins, new webpack.EnvironmentPlugin(["DELUGE_HOST"])]
    };
  }
};
