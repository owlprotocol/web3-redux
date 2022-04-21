//NodeJS Polyfills
//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
const NodeGlobalsPolyfillPlugin = require('@esbuild-plugins/node-globals-polyfill').NodeGlobalsPolyfillPlugin
const NodeModulesPolyfillPlugin = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
const rollupNodePolyFill = require('rollup-plugin-node-polyfills')
///require('rollup-plugin-polyfill-node');
const rollupInject = require('@rollup/plugin-inject')
const rollupCommonJS = require('@rollup/plugin-commonjs')
const rollupAlias = require('@rollup/plugin-alias')

//const dts = require('vite-dts').default
const EnvironmentPlugin = require('vite-plugin-environment').default;

//Typescript, ESLint check
const Checker = require('vite-plugin-checker').default;
//SVGR
const svgrPlugin = require('vite-plugin-svgr');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: "@storybook/react",
    core: {
        builder: "storybook-builder-vite"
    },
    features: {
        storyStoreV7: true,
        interactionsDebugger: true,
    },
    async viteFinal(config: any) {
        console.debug(config)
        config.optimizeDeps = config.optimizeDeps ?? {}
        config.optimizeDeps.include = [
            ...(config.optimizeDeps?.include ?? []),
            '@owlprotocol/web3-redux',
            '@storybook/testing-library',
            '@storybook/jest',
            'js-sha3',
            'web3'
        ];
        config.optimizeDeps.exclude = [
            ...(config.optimizeDeps?.exclude ?? []),
        ]

        // Enable esbuild polyfill plugins
        config.optimizeDeps.esbuildOptions = config.optimizeDeps.esbuildOptions ?? {}

        config.optimizeDeps.esbuildOptions.define = {
            global: 'globalThis'
        }

        config.optimizeDeps.esbuildOptions.plugins = [
            ...(config.optimizeDeps?.esbuildOptions?.plugins ?? []),
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true,
                define: { 'process.env.NODE_ENV': '"production"' },
            }),
            //NodeModulesPolyfillPlugin(),
        ]

        config.plugins = [
            ...(config.plugins ?? []),
            //Expose envars with traditional process.env
            //rollupCommonJS(),
            EnvironmentPlugin('all', { prefix: 'VITE_' }),
            svgrPlugin({
                svgrOptions: {
                    icon: true,
                },
            }),
            Checker({
                typescript: true,
                overlay: true,
                eslint: {
                    lintCommand: 'eslint --ext .ts,.tsx src --fix',
                },
            })
        ];

        config.resolve.alias = {
            ...(config.resolve?.alias ?? {}),
            //process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
            http: 'rollup-plugin-node-polyfills/polyfills/http',
            https: 'rollup-plugin-node-polyfills/polyfills/http',
            //buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
            //web3: 'web3/dist/web3.min.js'
        }

        config.define = {
            ...(config.define ?? {}),
            'process.env': process.env
        }

        config.build = {
            ...(config.build ?? {}),
            rollupOptions: {
                plugins: [
                    // Enable rollup polyfills plugin
                    // used during production bundling
                    /*
                    rollupAlias({
                        entries: [{
                            find: 'buffer', replacement: 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
                        }]
                    }),
                    */
                    rollupNodePolyFill({
                        include: null //all files
                    }),
                    rollupInject({
                        modules: {
                            Buffer: ['buffer', 'Buffer'],
                            process: ['process', 'process']
                        }
                    }),
                ],
            },
            commonjsOptions: {
                transformMixedEsModules: false,
            },
        }

        return config;
    }
};
