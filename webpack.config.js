const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const FileManagerPlugin = require('filemanager-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./index.html"),
    filename: "./index.html"
});


module.exports = (env) => {

    let entry =null
    if (env === "development") {
        entry = path.join(__dirname, "./app.js")
    }else{
        entry= path.join(__dirname, "./src/index.js")
    }
    return {
        entry: entry,
        output: {
            path: path.join(__dirname, "dist"),
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
            // new FileManagerPlugin({
            //         events: {
            //             onEnd: {
            //                 copy: [
            //                     {source: 'example/dist', destination: 'dist.zip'},
            //                     {source: 'config.ini', destination: 'dist.zip'},
            //                 ]
            //             }
            //         }
            //     }
            // )
        ],
        resolve: {
            extensions: [".js", ".jsx"]
        },
        devServer: {
            port: 3001,
        }
    };

}
