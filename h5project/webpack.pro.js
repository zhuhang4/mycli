const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cdnurl = '';
module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  // module: {
  //       rules: [
  //           {
  //               test: /\.js$/,
  //               loader: 'babel-loader',
  //               // exclude: path.resolve(__dirname, './src/lib'), //编译时，不需要编译哪些文件
  //               /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
  //               // query: {
  //               //     presets: ['env'] //按照最新的ES6语法规则去转换
  //               // }
  //           }
  //       ]
  //   },
  stats: 'errors-only',
  plugins: [
    // new UglifyJSPlugin({
    //   sourceMap: false,
    //   chunkFilter: (chunk) => {
    //     if (chunk.name === 'vendor') {
    //       return false;
    //     }
    //     return true;
    //   },
    // }),
    //cdn影响于template.html
    new HtmlWebpackPlugin({
      cdn: cdnurl,
      title: 'Production',
      test: '[hash]',
      chunks:['main'],
      template: projectName + '/src/template.html'
    }),
    //webpack影响于Preload.js
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      webpack_cdn: JSON.stringify(cdnurl)
    })
  ]
});
