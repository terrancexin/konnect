const path = require('path');

module.exports = {
  context: __dirname,
  entry: './client/index.jsx',
  output: {
    path: path.resolve(path.join(__dirname, '/public/')),
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
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    extensions: ['.jsx', '.js', '.scss'],
  },
};
