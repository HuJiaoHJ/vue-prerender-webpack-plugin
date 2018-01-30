const merge = require('webpack-merge');
const common = require('./common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const VuePrerenderWebpackPlugin = require('vue-prerender-webpack-plugin');
const skeleton = require('./skeleton');

const BUILD_TYPE = process.env.BUILD_TYPE || 'skeleton';

let entryPath = `./src/pages/**/*-normal.`;

// 通过 -- 选择以目录为维度构建，eg: npm run dev --page1 ，注意，只支持npm，不支持yarn
let argv = JSON.parse(process.env.npm_config_argv).original;
let configPage = argv[argv.length - 1];
if (configPage && /^--/.test(configPage)) {
    configPage = configPage.replace(/^--/, '');
    entryPath = entryPath.replace('**', configPage);
}

const js = glob.sync(`${entryPath}js`).reduce(function (prev, curr) {
    prev[curr.slice(6, -10)] = [curr];
    return prev;
}, {});

const chunks = Object.keys(js);

const html = [];

chunks.forEach((name) => {
    const config = {
        data: {
            buildType: BUILD_TYPE,
        },
        filename: `${name}.html`,
        template: `ejs-compiled-loader!./src/${name}.html`,
        inject: false,
        minify: false,
        chunks: [name],
    };
    html.push(new HtmlWebpackPlugin(config));
});

const base = {
    entry: js,
    plugins: BUILD_TYPE === 'skeleton' ? [
        new VuePrerenderWebpackPlugin({
            config: skeleton,
        }),
    ].concat(html) : [].concat(html),
};

module.exports = merge(common, base);
