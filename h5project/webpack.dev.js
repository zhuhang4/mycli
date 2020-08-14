const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
module.exports = merge(common, {
  mode:'development',
  devtool: 'inline-source-map',
  devServer: {
    // https: {
    //   key: fs.readFileSync('./192.168.18.114-key.pem'),
    //   cert: fs.readFileSync('./192.168.18.114.pem'),
    // },
    host:"192.168.18.114",
    port:global.port,
    contentBase: './dist',
    // stats: 'errors-warnings',
    // hot:true
  },
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
