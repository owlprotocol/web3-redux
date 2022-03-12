//NodeJS Polyfills
//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
const NodeGlobalsPolyfillPlugin = require('@esbuild-plugins/node-globals-polyfill').NodeGlobalsPolyfillPlugin
//const NodeModulesPolyfillPlugin = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    framework: "@storybook/react",
    core: {
        builder: "storybook-builder-vite"
    },
    features: {
        storyStoreV7: true,
    },
    async viteFinal(config: any) {
        config.optimizeDeps.include = [
            ...(config.optimizeDeps?.include ?? []),
            '@owlprotocol/web3-redux',
        ];

        // Enable esbuild polyfill plugins
        config.optimizeDeps.esbuildOptions = config.optimizeDeps.esbuildOptions ?? {}
        config.optimizeDeps.esbuildOptions.plugins = [
            ...(config.optimizeDeps?.esbuildOptions?.plugins ?? []),
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true,
            }),
            //NodeModulesPolyfillPlugin(),
        ]

        console.debug(config.optimizeDeps)
        console.debug(config.plugins)
        return config;

        config.resolve.alias = {
            ...(config.resolve?.alias ?? {}),
            // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
            // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
            // process and buffer are excluded because already managed
            // by node-globals-polyfill
            path: 'rollup-plugin-node-polyfills/polyfills/path',
            /*
            util: 'rollup-plugin-node-polyfills/polyfills/util',
            sys: 'util',
            events: 'rollup-plugin-node-polyfills/polyfills/events',
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
            querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
            punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
            url: 'rollup-plugin-node-polyfills/polyfills/url',
            //string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
            http: 'rollup-plugin-node-polyfills/polyfills/http',
            https: 'rollup-plugin-node-polyfills/polyfills/http',
            os: 'rollup-plugin-node-polyfills/polyfills/os',
            assert: 'rollup-plugin-node-polyfills/polyfills/assert',
            constants: 'rollup-plugin-node-polyfills/polyfills/constants',
            _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
            _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
            _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
            _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
            _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
            timers: 'rollup-plugin-node-polyfills/polyfills/timers',
            console: 'rollup-plugin-node-polyfills/polyfills/console',
            vm: 'rollup-plugin-node-polyfills/polyfills/vm',
            zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
            tty: 'rollup-plugin-node-polyfills/polyfills/tty',
            domain: 'rollup-plugin-node-polyfills/polyfills/domain',
            */
        }

        config.optimizeDeps.include = [
            ...(config.optimizeDeps?.include ?? []),
            '@owlprotocol/web3-redux',
            '@storybook/core-common',
        ];

        //https://github.com/eirslett/storybook-builder-vite/issues/141
        config.define = {
            ...config.define,
            global: {}
        }



        console.debug(config.resolve)

        return config;
    }
};
