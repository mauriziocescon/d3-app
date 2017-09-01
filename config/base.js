const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const {CheckerPlugin} = require("awesome-typescript-loader");

module.exports = (env) => {
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
            }, {
                from: "src/assets/i18n", to: "assets/i18n"
            }, {
                from: "src/assets/imgs", to: "assets/imgs"
            }]),

            // Automatically load modules instead of
            // having to import or require them everywhere
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),

            new CheckerPlugin(),

            // avoid processing *.scss.d.ts
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),

            // insert file dynamically
            new HtmlWebpackPlugin({
                template: "src/index.html",
                inject: "head"
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: (module) => {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf("node_modules") !== -1;
                }
            }),

            new StyleLintPlugin()
        ],

        module: {

            rules: [

                // template loaders
                {
                    test: /\.html?$/,
                    exclude: /index.html$/,
                    use: [
                        {loader: "html-loader", options: {exportAsEs6Default: true, minimize: true}}
                    ]
                },

                // all files with a ".ts" or ".tsx" extension will be handled by awesome-typescript-loader
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: [
                        {loader: "awesome-typescript-loader", options: {useBabel: true, useCache: true}}
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
                },

                // add jQuery to the global object
                {
                    test: require.resolve("jquery"),
                    use: [
                        {loader: "expose-loader", options: "jQuery"},
                        {loader: "expose-loader", options: "$"}
                    ]
                },

                // add Popper to the global object
                {
                    test: require.resolve("popper.js"),
                    use: [
                        {loader: "expose-loader", options: "Popper"}
                    ]
                }
            ]
        }
    };
};
