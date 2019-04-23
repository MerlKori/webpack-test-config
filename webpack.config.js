const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const conf = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: 'dist/'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css"),
	]
};

module.exports = (env, options) => {
	const modeProd = options.mode === 'production';

	if (!modeProd) {
		conf.devtool = 'eval-source-map';
	}

	// or conf.devtool = modeProd ? 'source-map' : 'eval-source-map';

	return conf;
};
