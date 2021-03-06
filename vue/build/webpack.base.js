const path = require('path')
const ROOT = path.resolve(__dirname, '../')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: `${ROOT}/src/index`
  },
  output: {
    path: `${ROOT}/public`,
    filename: 'dist/[name].js',
    chunkFilename: 'dist/chunks/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'public': `${ROOT}/public`,
      'src': `${ROOT}/src`,
      'components': `${ROOT}/src/components`,
      'ui': `${ROOT}/src/components/UI`,
      'views': `${ROOT}/src/views`,
      'store': `${ROOT}/src/store`,
      'mixins': `${ROOT}/src/mixins`,
      'api': `${ROOT}/src/api`,
      'assets': `${ROOT}/src/assets`,
      'config': `${ROOT}/src/config`,
      'service': `${ROOT}/src/service`,
      'plugins': `${ROOT}/src/plugins`,
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: `${ROOT}/src/`
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: `${ROOT}/src/`,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'dist/images/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'dist/fonts/[name].[contenthash:8].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${ROOT}/src/index.dll.html`,
      inject: true
    }),
    new webpack.DllReferencePlugin({
      context: `${ROOT}/config`,
      manifest: require('../config/vendor1.manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: `${ROOT}/config`,
      manifest: require('../config/vendor2.manifest.json')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
