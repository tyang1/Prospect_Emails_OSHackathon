const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    entry: './index.jsx',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index_bundle.js',
    },
    //Note: the following is only needed for hot module reload
    // devServer: {
    //   contentBase: path.resolve(__dirname, 'dist'),
    //   hot: true,
    // },
    module: {
      rules: [
        { test: /\.(jsx)$/, use: 'babel-loader' },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.DEV_API_URL': JSON.stringify(`${env.DEV_API_URL}`),
      }),
      // new webpack.HotModuleReplacementPlugin(),
    ],
  };
};
