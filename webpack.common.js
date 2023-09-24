const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    print: {
      import: './src/print.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: ['core-js', 'lodash']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // Public path is required for webpack server
    //publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    usedExports: true
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    }, {
      test: /\.(csv|tsv)$/i,
      use: ['csv-loader'],
    }, {
      test: /\.xml$/i,
      use: ['xml-loader'],
    }, {
      test: /\.toml$/i,
      type: 'json',
      parser: {
        parse: toml.parse
      }
    }, {
      test: /\.yaml$/i,
      type: 'json',
      parser: {
        parse: yaml.parse
      }
    }, {
      test: /\.json5$/i,
      type: 'json',
      parser: {
        parse: json5.parse
      }
    }, {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './static', to: 'public' }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Shimming'
    }),
    new webpack.ProvidePlugin({
        _: 'lodash',
    })
  ]
};
