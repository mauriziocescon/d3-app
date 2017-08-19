const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CheckerPlugin} = require("awesome-typescript-loader");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = function (env) {
    return {
        entry: {
            app: "./src/main.ts",
            vendor: "./src/vendor.ts"
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add ".ts" and ".tsx" as a resolvable extension.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss", ".html", ".json"]
        },

        plugins: [

            // scope hoisting
            new webpack.optimize.ModuleConcatenationPlugin(),

            // clean dist folder
            new CleanPlugin(["dist", "build"], {
                root: path.resolve(__dirname, "../"),
                verbose: true,
                dry: false,
                exclude: []
            }),

            new CopyPlugin([{
                from: "src/index.html"
            }, {
                from: "src/manifest.json"
            },  {
                from: "src/assets/i18n", to: "assets/i18n"
            }, {
                from: "src/assets/imgs", to: "assets/imgs"
            }]),

            new CheckerPlugin(),

            new ExtractTextPlugin("[name].[hash].css"),

            // insert file dynamically
            new HtmlWebpackPlugin({
                template: "src/index.html",
                inject: "head"
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: function (module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf("node_modules") !== -1;
                }
            }),

            new StyleLintPlugin()
        ],

        module: {

            rules: [

                // creates style nodes from JS strings
                // translates CSS into CommonJS
                // compiles Sass to CSS
                {
                    test: /\.scss$/,
                    exclude: /styles.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {loader: "css-loader", options: {camelCase: true, modules: true}},
                            {loader: "resolve-url-loader"},
                            {loader: "sass-loader", options: {sourceMap: true}}
                        ]
                    })
                },

                // creates style nodes from JS strings
                // translates CSS into CommonJS
                // compiles Sass to CSS
                {
                    test: /styles.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {loader: "css-loader", options: {modules: false}},
                            {loader: "resolve-url-loader"},
                            {loader: "sass-loader", options: {sourceMap: true}}
                        ]
                    })
                },

                // template loaders
                {
                    test: /\.html?$/,
                    exclude: /index.html$/,
                    use: [
                        {loader: "html-loader", options: {exportAsEs6Default: true}}
                    ]
                },

                // images loader
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    use: [
                        {loader: "file-loader", options: {name: "[name].[hash].[ext]"}}
                    ]
                },

                // all files with a ".ts" or ".tsx" extension will be handled by ts-loader
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: [
                        {loader: "awesome-typescript-loader", options: {useBabel: true}}
                    ]
                },

                // preprocess + ts-lint
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /node_modules/,
                    enforce: "pre",
                    use: [
                        {loader: "tslint-loader", options: {emitErrors: false, formatter: "stylish"}},
                        {loader: "preprocess-loader", options: {}}
                    ]
                },

                // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: [
                        {loader: "source-map-loader"}
                    ]
                }
            ]
        },

        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: "[name].[hash].js"
        }
    };
};
