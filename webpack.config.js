const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: {
    main: './demo/index.tsx',
  },
  output: {
    path: path.resolve('dist', 'demo'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: process.platform === 'linux' ? '0.0.0.0' : 'localhost',
    port: process.env.PORT || 8080,
    contentBase: path.resolve('public'),
    overlay: true,
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Crypto Pro Demo',
      template: 'public/index.html',
      inject: 'head',
      hash: true,
    }),
  ],
};
