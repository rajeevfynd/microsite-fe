const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

function formatEnvironmentEntries(env) {
  return Object.entries(env).map(([key, value]) => [
    key,
    JSON.stringify(value),
  ]);
}

function resolveEnvironment() {
  let envFile = path.resolve(__dirname, ".env");
  let localEnv = dotenv.parse(fs.readFileSync(envFile, { encoding: "utf8" }));
  let environmentEntries = formatEnvironmentEntries(process.env);
  let localEnvironmentEntries = formatEnvironmentEntries(localEnv);
  return Object.fromEntries([
    ...localEnvironmentEntries,
    ...environmentEntries,
  ]);
}

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
              modifyVars: {
                'primary-color': '#00adb5',
                'link-color': '#1DA57A',
                'border-radius-base': '2px',
              },
              javascriptEnabled: true,
            },
          },
        }],
        // ...other rules
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
    new webpack.DefinePlugin({ process: { env: { ...resolveEnvironment() } } }),
  ],
};
