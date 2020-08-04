const path = require('path');

module.exports = {

	entry: "./tmp/js/script.js",

	output: {

		path: path.resolve(__dirname, "dist/js"),

		filename: "bundle.js"

	},

	devtool: 'source-map',

	mode: 'development',

	watch: true

}