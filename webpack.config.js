module.exports = {
	entry: './src/index.js',
	devtool: 'inline-source-map',
	output: {
		filename: 'dist/bundle.js'
	},
	module: {
		rules: [{
			test: /\.(s*)css$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}]
	},
};
