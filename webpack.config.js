// var webpack = require('webpack')
// var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin')

// module.exports = {
//   entry: './src/index.js',
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production')
//       }
//     }),

//     new webpackUglifyJsPlugin({
//       cacheFolder: __dirname + 'public/cached_uglify/',
//       debug: false,
//       sourceMap: false,
//       drop_console: true,
//       output: {
//         comments: false
//       },
//       compressor: {
//         warnings: false
//       }
//     })
//   ],

//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loaders: ['babel-loader']
//       },
//       {
//         test: /\.scss$/,
//         loader: 'style!css!sass?sourceMap'
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader!css-loader'
//       }

//     ]
//   },
//   output: {
//     filename: 'bundle.js',
//     path: __dirname + '/build'
//   }
// }
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [ "es2015", "react", "stage-0"]
      }
    }, 
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader?sourceMap'
    },]
  }
};
