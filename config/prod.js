const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const commonConfig = require("./base.js");

module.exports = function (env) {
    return webpackMerge(commonConfig(env), {

        devtool: "source-map",

        plugins: [

            new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    keep_fnames: true
                },
                sourceMap: true
            }),

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

            new webpack.DefinePlugin({
                "process.env": {
                    "ENV": JSON.stringify("production")
                }
            })
        ]
    });
};
