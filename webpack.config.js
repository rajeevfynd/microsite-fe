const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

function formatEnvironmentEntries(env) {
    return Object.entries(env)
        .map(([key, value]) => [key, JSON.stringify(value)]);
}

function resolveEnvironment() {
    let envFile = path.resolve(__dirname, 'local.env');
    let localEnv = dotenv.parse(fs.readFileSync(envFile, { encoding: 'utf8' }))
    let environmentEntries = formatEnvironmentEntries(process.env);
    let localEnvironmentEntries = formatEnvironmentEntries(localEnv);
    return Object.fromEntries([...localEnvironmentEntries, ...environmentEntries]);
}

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
        new webpack.DefinePlugin({ process: { env: { ...resolveEnvironment() } } })
    ]
}