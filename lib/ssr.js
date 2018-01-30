const path = require('path');
const webpack = require('webpack');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const MFS = require('memory-fs');

module.exports = ({config}, htmlTemp, outputPath) => {        

    return new Promise((resolve, reject) => {
        const template = htmlTemp;
        const compiler = webpack(config);
        const mfs = new MFS();
        compiler.outputFileSystem = mfs;

        const watching = compiler.watch({}, (err, stats) => {

            if (err) {
                reject(err);
                watching.close();
                return;
            }

            stats = stats.toJson();
            stats.errors.forEach( err => {
                console.error(err);
            });
            stats.warnings.forEach( err => {
                console.warn(err);
            });

            const bundle = mfs.readFileSync(path.join(compiler.outputPath, `${outputPath}-server.js`), 'utf-8');

            const renderer = createBundleRenderer(bundle, {
                template,
            });

            renderer.renderToString({}, (err, skeletonHtml) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        skeletonHtml,
                    });
                }
                watching.close();
            });
        });
    }); 
};
