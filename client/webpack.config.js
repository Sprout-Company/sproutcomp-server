
const { 
  DIR,
  CLIENT_DIR,
  PORT: SERVER_PORT, 
  CLIENT_PORT,
} = require('../config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  // main file
  entry: './src/index.js',
  mode: process.env.NODE_ENV, // production or development

  // main export file
  output: {
    path: CLIENT_DIR,
    filename: 'bundle.js',
    publicPath: '/',
  },

  // if start a dev server
  devServer: {
    port: CLIENT_PORT,
    compress: true,
    hot: true,
    open: true,
    liveReload: true,
    historyApiFallback: true,
    proxy: [
      {
        context: [
          '/socket.io', 
          '/api', 
          '/auth'
        ],
        target: 'http://localhost:' + SERVER_PORT,
        secure: false,
      }
    ]
  },

  // html export
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  resolve: {
    // alias imports
    alias: {
      // for program in mobile :')
      'eruda': process.env.NODE_ENV === 'production' ?
        DIR + '/client/src/utils/__eruda-fake.js': // remove eruda in production
        'eruda',
    },
    extensions: ['.*', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpg|png)$/i,
        type: 'asset',
      },
    ],
  },
};