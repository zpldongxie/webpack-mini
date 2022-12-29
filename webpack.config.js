const path = require('path');
const { WebpackRunPlugin, WebpackDonePlugin } = require('./webpack');

const loader1 = source => {
  return source + '// 给你的代码加点注释：loader1';
};

const loader2 = source => {
  return source + '// 给你的代码加点注释：loader2';
};

module.exports = {
  mode: 'development', //防止代码被压缩
  entry: './src/index.js', //入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'source-map', //防止干扰源文件
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [loader1, loader2],
      },
    ],
  },
  plugins: [new WebpackRunPlugin(), new WebpackDonePlugin()],
};
