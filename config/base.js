const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const {CheckerPlugin} = require("awesome-typescript-loader");

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
            }, {
                from: "src/assets/i18n", to: "assets/i18n"
            }, {
                from: "src/assets/imgs", to: "assets/imgs"
            }]),

            new CheckerPlugin(),

            // avoid processing *.scss.d.ts
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),

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

            // Speed up build caching node_modules
            // new HardSourceWebpackPlugin(),

            // Generate a manifest file which contains a mapping of all asset filenames
            // to their corresponding output file so that tools can pick it up without
            // having to parse `index.html`.
            new ManifestPlugin({
                fileName: "asset-manifest.json"
            }),
            // Generate a service worker script that will precache, and keep up to date,
            // the HTML & assets that are part of the Webpack build.
            new SWPrecacheWebpackPlugin({
                // By default, a cache-busting query parameter is appended to requests
                // used to populate the caches, to ensure the responses are fresh.
                // If a URL is already hashed by Webpack, then there is no concern
                // about it being stale, and the cache-busting can be skipped.
                dontCacheBustUrlsMatching: /\.\w{8}\./,
                filename: "service-worker.js",
                logger(message) {
                    if (message.indexOf("Total precache size is") === 0) {
                        // This message occurs for every build and is a bit too noisy.
                        return;
                    }
                    if (message.indexOf("Skipping static resource") === 0) {
                        // This message obscures real errors so we ignore it.
                        // https://github.com/facebookincubator/create-react-app/issues/2612
                        return;
                    }
                    console.log(message);
                },
                minify: true,
                // For unknown URLs, fallback to the index page
                navigateFallback: path.resolve(__dirname, "../dist") + "/index.html",
                // Ignores URLs starting from /__ (useful for Firebase):
                // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
                navigateFallbackWhitelist: [/^(?!\/__).*/],
                // Don't precache sourcemaps (they're large) and build asset manifest:
                staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
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
                            {loader: "typings-for-css-modules-loader", options: {camelCase: true, modules: true, minimize: true, namedExport: true}},
                            {loader: "resolve-url-loader"},
                            {loader: "sass-loader", options: {sourceMap: true}},
                            {loader: "sass-resources-loader", options: {resources: "./src/assets/stylesheets/base.scss"}
                            }
                        ]
                    })
                },

                // creates style nodes from JS strings
                // translates CSS into CommonJS
                // compiles Sass to CSS
                //
                // global sass
                {
                    test: /styles.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {loader: "css-loader", options: {minimize: true, modules: false}},
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
