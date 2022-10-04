const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.optimize.SplitChunksPlugin('common.js'),
        new DuplicatePackageCheckerPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
});