const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js', //エントリーポイントの設定
  output: {
    filename: 'bundle.js', //出力ファイル名
    path: path.resolve(__dirname, 'public/js')
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
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  }
}