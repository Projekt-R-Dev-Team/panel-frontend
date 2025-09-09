const fs = require("fs");
const webpack = require("webpack");
const packageJson = fs.readFileSync("./package.json");
const version = 1;

module.exports = {
    chainWebpack: config => {
        config.module
            .rule("eslint")
            .use("eslint-loader")
            .options({
                fix: true
            });
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                "process.env":{
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    },
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: true
        }
    }
}
