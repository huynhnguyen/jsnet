const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const pkg     = require('./package.json');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');
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
    'lib/operators' :  __dirname + '/src/number/operators.js',
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
    filename: outputFile,
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
        // inject: false
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
console.log(Object.keys(pkg.dependencies));
module.exports = config;