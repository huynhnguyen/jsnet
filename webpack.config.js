const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const pkg     = require('./package.json');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'skynet';

let outputFile;

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
  	main  :  __dirname + '/src/index.js',
  	vendor: ['mathjs','underscore']
  },
  devtool: 'source-map',
  devServer: {
     contentBase: __dirname + '/dist',
     port: PORT,
     hot: true,
     inline: true
  },
  output: {
    path: __dirname + '/dist/lib',
    publicPath: '/dist/',
    filename: outputFile,
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
    //Finally add this line to bundle the vendor code separately
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.min.js'})
    // new html({template : __dirname + '/8888/index.html'})
  ]
};
console.log(Object.keys(pkg.dependencies));
module.exports = config;