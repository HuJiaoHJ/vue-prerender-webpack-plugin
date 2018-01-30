const ssr = require('./ssr.js');

const VuePrerenderWebpackPlugin = function VuePrerenderWebpackPlugin(options) {
    this.options = options;
};

VuePrerenderWebpackPlugin.prototype.apply = function apply (compiler) {

    compiler.plugin('compilation', (compilation) => {

        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            
            const outputPath = htmlPluginData.outputName.slice(0, -5);
            
            ssr(this.options, htmlPluginData.html, outputPath).then((ref) => {
                htmlPluginData.html = ref.skeletonHtml;
                callback(null, htmlPluginData);
                return;
            });
        });
    });
};

module.exports = VuePrerenderWebpackPlugin;
