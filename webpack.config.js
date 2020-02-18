const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ( env, argv ) => ({
  mode: 'development',
  // エントリーポイントの設定
  entry: {
    'js/bundle.js':'./src/js/app.js',
  },
  output: {
    filename: '[name]', //出力ファイル名
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCssAssetsPlugin({})
    ]
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
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require("css-mqpacker")({
                  sort: true
                }),
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
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
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '/css/style.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    port: 5000,
    hot: true
  }
});