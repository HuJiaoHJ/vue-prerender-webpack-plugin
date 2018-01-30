const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const prod = {
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS:{
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                },
            },
        }),
    ],
    stats: {
        children: false,
        chunks: false,
    },
    bail: true,
};

module.exports = merge(base, prod);
