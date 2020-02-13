const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  // エントリーポイントの設定
  entry: {
    'js/bundle.js':'./src/js/app.js',
  },
  output: {
    filename: '[name]', //出力ファイル名
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        // 対象ファイル
        test: /\.js$/,
        // 対象となるディレクトリ
        include: path.resolve(__dirname, 'src/js'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env',{ modules: false }]]
          }
        }],
      },
      {
        // 対象ファイル
        test: /\.scss$/,
        // 対象となるディレクトリ
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '/css/style.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}