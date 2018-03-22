const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    // hdmap: __dirname + "/src/hdmap.js",
    main: __dirname + '/test/main.js'
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究！'),
    new HtmlWebpackPlugin({
      template: __dirname + '/test/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/lib',
        to: __dirname + '/public/lib'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/dist',
        to: __dirname + '/public/lib/hdmap'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/assets',
        to: __dirname + '/public/assets'
      }
    ]),
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ["main","hdmap"],
    //     minChunks: Infinity
    // }),
    new CleanWebpackPlugin(
      ['public/*.js'], // 匹配删除的文件
      {
        root: __dirname, // 根目录
        verbose: true, // 开启在控制台输出信息
        dry: false // 启用删除文件
      }
    )
  ]
}
