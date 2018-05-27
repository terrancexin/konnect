const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname + '/public/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
        },
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './assets/font/',
            publicPath: '../',
          },
        }],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('dist/styles/main.css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        MONGOLAB_URI: JSON.stringify(process.env.MONGOLAB_URI),
        ROOT_URL: JSON.stringify(process.env.ROOT_URL),
        SECRET_JWT_KEY: JSON.stringify(process.env.SECRET_JWT_KEY),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    extensions: ['.jsx', '.js', '.scss'],
  },
};