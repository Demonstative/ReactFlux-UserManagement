
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    
    context: path.resolve('./app'),
    entry: '../config.jsx',
    output: {
        path: path.resolve('./build/'),
        publicPath: '/public/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // { test: /\.XXXX$/, exclude: /node_modules/, loader: 'XXXX' },
            { test: /\.js$/,  exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('css-loader') },
        ],
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        extensions: [ '*', '.js', '.jsx' ]
    },
    devServer: { contentBase: './public' },
    watch: true,
    
};
