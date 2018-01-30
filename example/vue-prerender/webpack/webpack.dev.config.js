const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const dev = {
    output: {
        pathinfo: true,
        filename: '[name].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devtool: 'eval-source-map',
    cache: true,
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true,
        stats: {
            children: false,
            chunks: false
        }
    }
};

module.exports = merge(base, dev);
