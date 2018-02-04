const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const pkg     = require('./package.json');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
// const ReloadPlugin = require('reload-html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = require('yargs').argv.env;

let libraryName = 'skynet';

let outputFile;
let plugins = [];
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}
const PORT = 3000;
const config = {
  entry: 
  {
  	'lib/number'   :  __dirname + '/src/number/number.js',
    'lib/operators':  __dirname + '/src/number/operators.js',
    'lib/autograd':  __dirname + '/src/number/autograd/autograd.js'
  },
  devtool: 'source-map',
  devServer: {
     contentBase: __dirname + '/dist',
     port: PORT,
     hot: true,
     inline: true
  },
  output: {
    path: __dirname + '/dist/',
    publicPath: '/dist/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
    // filename: outputFile,
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        // inject: true
    }),
    new HtmlWebpackPlugin({
        filename: 'autograd.html',
        template: './src/autograd.html',
        // inject: false
    }),
    new HtmlWebpackPlugin({
        filename: 'benchmark.html',
        template: './src/benchmark.html',
        // inject: true
    }),
    new HtmlWebpackPlugin({
        filename: 'unittest.html',
        template: './src/unittest.html',
        // inject: true
    }),
    new CopyWebpackPlugin([{from: 'test/', to:'test/' }]),
    new webpack.HotModuleReplacementPlugin()
  ]
};
console.log(Object.keys(pkg.dependencies));
module.exports = config;