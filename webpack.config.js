const { join } = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

const environment = process.env.NODE_ENV || 'development';

module.exports = {
  mode: environment,
  entry: join(__dirname, 'src', 'index.js'),
  output: {
    libraryTarget: 'umd',
    filename: 'bundle.js',
    library: 'CF7Validate',
    umdNamedDefine: true,
    path: join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            envName: environment
          }
        },
      }
    ],
  },

  plugins: [
    new DashboardPlugin()
  ],
};
