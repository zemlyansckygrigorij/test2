var 	path = require('path'),
 		webpack = require('webpack');
 		//UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var pathProject = {
    js : './js/proj/',
    jsDist : '/js/c/'
};

module.exports = {
	entry: ['babel-polyfill', pathProject.js+'main.js'],
	plugins: [
		/*
     	new webpack.DefinePlugin({
       		'process.env.NODE_ENV': JSON.stringify('production')
     	})*/
	],
	output: {
		path: path.join(__dirname, '/js/'),
		filename: 'bundle.js',
		publicPath: '/js/'
	},
	module: {
		rules: [
			{
				test: /\.js/
			},
			{
			    test: /\.vue$/,
			    loader: 'vue-loader',
			    options: {
			        cacheDirectory: true
			    }
			}
		]
	}
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ])
}