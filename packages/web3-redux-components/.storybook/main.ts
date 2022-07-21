//NodeJS Polyfills
const { mergeConfig } = require('vite');

//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
//ESBuild Plugins
//const NodeGlobalsPolyfillPlugin = require('@esbuild-plugins/node-globals-polyfill').NodeGlobalsPolyfillPlugin
//const NodeModulesPolyfillPlugin = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin

//Rollup Plugins
const rollupInject = require('@rollup/plugin-inject')

//Vite Plugins
//const EnvironmentPlugin = require('vite-plugin-environment').default;
const CheckerPlugin = require('vite-plugin-checker').default;
const SVGRPlugin = require('vite-plugin-svgr').default;

module.exports = {
    framework: "@storybook/react",
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        //"@storybook/addon-interactions",
    ],
    core: {
        builder: "@storybook/builder-vite"
    },
    features: {
        storyStoreV7: true,
        interactionsDebugger: true,
    },
    async viteFinal(config) {
        const overrideConfig = {
            define: {
                //patch ipfs utils
                'globalThis.process.env.NODE_ENV': JSON.stringify('development')
            },
            optimizeDeps: {
                include: [],
                exclude: [],
                esbuildOptions: {
                    plugins: [
                        /*
                        NodeGlobalsPolyfillPlugin({
                            process: true,
                            buffer: true,
                        }),
                        */
                    ]
                }
            },
            plugins: [
                /*
                rollupInject({
                    Buffer: ['buffer', 'Buffer'],
                }),
                */
                //Expose envars with traditional process.env
                //EnvironmentPlugin('all', { prefix: 'VITE_' }),
                SVGRPlugin({
                    svgrOptions: {
                        icon: '100%',
                    },
                }),
                CheckerPlugin({
                    typescript: { tsconfigPath: './tsconfig.json' },
                    overlay: true,
                    eslint: {
                        lintCommand: 'eslint .',
                    },
                }),
            ],
            resolve: {
                alias: {
                    stream: 'rollup-plugin-node-polyfills/polyfills/stream',
                    http: 'rollup-plugin-node-polyfills/polyfills/http',
                    https: 'rollup-plugin-node-polyfills/polyfills/http',
                    buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
                    web3: 'web3/dist/web3.min.js',
                    //'ipfs-http-client': 'ipfs-http-client/index.min.js'
                    //'@owlprotocol/web3-redux': '@owlprotocol/web3-redux/dist/web3-redux-lib.es.min.js'
                },
            },
            build: {
                commonjsOptions: {
                    transformMixedEsModules: false,
                },
                rollupOptions: {
                    output: {
                        manualChunks: {
                            //web3: ['web3'],
                            //lodash: ['lodash']
                        }
                    }
                }
            }
        }

        //console.debug(config)
        //console.debug(overrideConfig)
        const newConfig = mergeConfig(config, overrideConfig)
        return newConfig;
    }
};
