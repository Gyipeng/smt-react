const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./example/src/index.html"),
    filename: "./index.html"
});



module.exports = {
    // entry: path.join(__dirname, "./example/src/app.js"),
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "example/dist"),
        filename: 'smt-react.js',
        library: "smt-react",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [
        htmlWebpackPlugin,
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {source: 'example/dist', destination: 'dist.zip'},
                        {source: 'config.ini', destination: 'dist.zip'},
                    ]
                }
            }
        }
        )
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3001,
    }
};