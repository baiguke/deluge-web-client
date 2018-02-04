const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  webpack(config) {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
          "process.env.BUILD_TIME": JSON.stringify(Date.now())
        })
      ]
    };
  }
};
