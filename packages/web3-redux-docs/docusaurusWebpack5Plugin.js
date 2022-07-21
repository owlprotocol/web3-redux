const webpack = require('webpack'); //to access built-in plugins

// eslint-disable-next-line
module.exports = function (context, options) {
    return {
        name: 'custom-docusaurus-plugin',
        // eslint-disable-next-line
        configureWebpack(config, isServer, utils) {
            return {
                experiments: {
                    topLevelAwait: true
                },
                ignoreWarnings: [
                    {
                        message: /Critical dependency: the request of a dependency is an expression/
                    }
                ],
                resolve: {
                    alias: {
                        path: require.resolve('path-browserify'),
                        process: require.resolve('process/browser'),
                        util: require.resolve('util/')
                    },
                    fallback: {
                        assert: false,
                        buffer: require.resolve('buffer/'),
                        events: require.resolve('events/'),
                        fs: false,
                        http: require.resolve('stream-http'),
                        https: require.resolve('https-browserify'),
                        os: require.resolve('os-browserify/browser'),
                        stream: require.resolve("stream-browserify"),
                        string_decoder: require.resolve("string_decoder/"),
                        crypto: require.resolve("crypto-browserify"),
                        url: require.resolve("url/"),
                    },
                },
                plugins: [
                    new webpack.ProvidePlugin({
                        Buffer: ['buffer', 'Buffer'],
                    }),
                    new webpack.EnvironmentPlugin({
                        NODE_DEBUG: false,
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                        DEBUG: false,
                    })
                ]
            };
        },
    };
};
