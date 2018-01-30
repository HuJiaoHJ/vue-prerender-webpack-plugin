const merge = require('webpack-merge');
const coomon = require('./common');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

let entryPath = `./src/pages/**/*-skeleton.`;

// 通过 -- 选择以目录为维度构建，eg: npm run dev --page1 ，注意，只支持npm，不支持yarn
let argv = JSON.parse(process.env.npm_config_argv).original;
let configPage = argv[argv.length - 1];
if (configPage && /^--/.test(configPage)) {
    configPage = configPage.replace(/^--/, '');
    entryPath = entryPath.replace('**', configPage);
}

const js = glob.sync(`${entryPath}js`).reduce(function (prev, curr) {
    prev[curr.slice(6, -12)] = [curr];
    return prev;
}, {});

const skeleton = {
    target: 'node',
    devtool: '#source-map',
    entry: js,
    output: {
        filename: '[name]-server.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    })
};

module.exports = merge(coomon, skeleton);
