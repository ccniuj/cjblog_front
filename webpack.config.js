var path = require('path')
var webpack = require('webpack')
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({NODE_ENV: env})
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.json$/,
        loaders: [ 'json' ],
        exclude: /node_modules/,
        include: __dirname,
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  }
}
