var webpack = require('webpack');
var env = process.env.ENV ? process.env.ENV : 'production';

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  entry: {
    'js/index': './index.js'
  },
  output: {
    path: 'public/bundles',
    publicPath: '/bundles/',
    filename: '[name].js'
  },
  externals: {
    'Config': JSON.stringify(require('./config.json')[env])
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.json$/, loader: 'json'},
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets:['react'] } },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  devtool: '#inline-source-map'
};