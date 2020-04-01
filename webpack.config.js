const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const globule = require('globule');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dir = {
  src: path.resolve(__dirname, 'src'),
  srcPug: path.resolve(__dirname, 'src/pug'),
  srcSass: path.resolve(__dirname, 'src/scss'),
  srcJs: path.resolve(__dirname, 'src/js'),
  dist: path.resolve(__dirname, 'public')
};
const from = 'pug';
const to = 'html';
const htmlPluginConfig = globule.find([`**/*.${from}`, `!**/_*.${from}`], {cwd: dir.srcPug}).map(filename => {
  // const file = filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`).split('/')
  return new HtmlWebpackPlugin({
    filename: `${dir.dist}/` + filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`).replace(/(\.\/)?pug/, '.'),
    template: `${dir.srcPug}/${filename}`
  })
});

module.exports = ( env, argv ) => ({
  mode: 'development',
  // エントリーポイントの設定
  entry: {
    'js/bundle.js':'./src/js/app.js',
  },
  output: {
    filename: '[name]', //出力ファイル名
    path: dir.dist,
    // publicPath: '/public',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  module: {
    rules: [

      // pug-loaderの設定
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: argv.mode !== 'production' ? {
            pretty: true
          } : {}
        }]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        include: dir.srcJs,
        loader: "eslint-loader",
        options: {
            fix: true
        }
      },
      {
        // 対象ファイル
        test: /\.js$/,
        // 対象となるディレクトリ
        include: dir.srcJs,
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
        include: dir.srcSass,
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
          'import-glob-loader'
        ],
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist'],{
        // 除外するファイルやディレクトリを指定
        //exclude: ['images']
    //}),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    ...htmlPluginConfig
  ],
  devServer: {
    contentBase: [dir.src,dir.dist],
    compress: true,
    watchContentBase: true,
    port: 5000,
    inline: true,
    host: '0.0.0.0'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }

});