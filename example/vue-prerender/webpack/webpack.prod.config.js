const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const prod = {
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
    stats: {
        children: false,
        chunks: false,
    },
    bail: true,
};

module.exports = merge(base, prod);
