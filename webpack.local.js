const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/microsite/**": {
        target: "http://localhost:8082",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
