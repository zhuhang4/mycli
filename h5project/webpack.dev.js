const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
module.exports = merge(common, {
  mode:'development',
  devtool: 'cheap-module-eval-source-map',
 
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev'),
        webpack_cdn:JSON.stringify('')
     }),
     
     new HtmlWebpackPlugin({
      // inject: false,
      title: 'Dev',
      test:'[hash]',
      chunks:['main'],
      template: projectName+'/src/template.html'
    })
  ]
});
