const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
    clean: true,
    // Public path is required for webpack server
    //publicPath: '/'
  },
  optimization: {
    //runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    }
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
      test: /\.(m?js|tsx?)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, '.babelrc')
        },
      }, {
        loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
      }]
    }, {
        test: /\.d\.ts$/,
        loader: 'ignore-loader'
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './static', to: 'public' }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Typescript'
    }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    })
  ]
};
