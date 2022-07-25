//NodeJS Polyfills
const { mergeConfig } = require('vite');

//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
//ESBuild Plugins
//const NodeGlobalsPolyfillPlugin = require('@esbuild-plugins/node-globals-polyfill').NodeGlobalsPolyfillPlugin
//const NodeModulesPolyfillPlugin = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin

//Rollup Plugins
const rollupInject = require('@rollup/plugin-inject')
const rollupPolyfills = require('rollup-plugin-node-polyfills')
//const rollupNodeResolve = require('@rollup/plugin-node-resolve').nodeResolve

//Vite Plugins
//const EnvironmentPlugin = require('vite-plugin-environment').default;
const CheckerPlugin = require('vite-plugin-checker').default;
const SVGRPlugin = require('vite-plugin-svgr');

const path = require('path');

//const MODE = import.meta.env.MODE;
const NODE_ENV = process.env.NODE_ENV ?? 'development' /// process.env.MODE
const production = NODE_ENV === 'production';

module.exports = {
    framework: "@storybook/react",
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-viewport"
        //"@storybook/addon-interactions",
    ],
    core: {
        builder: "@storybook/builder-vite"
    },
    features: {
        storyStoreV7: true,
        interactionsDebugger: true,
    },
    async viteFinal(config: any) {
        const overrideConfig = {
            define: {
                //patch ipfs utils
                'globalThis.process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                //'globalThis."development"': JSON.stringify('development'),
                //pathc @storybook/theming
                'process.env.FORCE_SIMILAR_INSTEAD_OF_MAP': JSON.stringify(false)
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
                    /*
                    eslint: {
                        lintCommand: 'eslint .  --ext .ts,.tsx',
                    },
                    */
                }),
            ],
            resolve: {
                alias: {
                    buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
                    events: 'rollup-plugin-node-polyfills/polyfills/events',
                    http: 'rollup-plugin-node-polyfills/polyfills/http',
                    https: 'rollup-plugin-node-polyfills/polyfills/http',
                    process: 'rollup-plugin-node-polyfills/polyfills/process',
                    stream: 'rollup-plugin-node-polyfills/polyfills/stream',
                    'string_decoder': 'rollup-plugin-node-polyfills/polyfills/string_decoder',
                    url: 'rollup-plugin-node-polyfills/polyfills/url',
                    util: 'rollup-plugin-node-polyfills/polyfills/util',
                    web3: 'web3/dist/web3.min.js',
                    '@owlprotocol/web3-redux': '@owlprotocol/web3-redux/dist/index.es.min.js',
                    'ipfs-http-client': production ? path.resolve('node_modules/ipfs-http-client/index.min.js') : 'ipfs-http-client'
                },
            },
            build: {
                resolve: {
                    'ipfs-http-client': path.resolve('node_modules/ipfs-http-client/index.min.js')
                },
                commonjsOptions: {
                    transformMixedEsModules: false,
                },
                rollupOptions: {
                    plugins: [
                        //rollupNodeResolve(),
                        rollupPolyfills(),
                        rollupInject({
                            Buffer: ['buffer', 'Buffer'],
                        }),
                    ],
                    output: {
                        manualChunks(id: any) {
                            const vendors = [
                                { match: /web3@/, chunk: 'web3' },
                                { match: /@web3-react/, chunk: 'web3-react' },
                                { match: /@walletconnect/, chunk: 'walletconnect' },
                                { match: /@fortawesome/, chunk: '@fortawesome' },
                                { match: /lodash@/, chunck: 'lodash' },
                                { match: /ipfs-http-client@/, chunk: 'ipfs-http-client' },
                                //{ match: /@storybook/, chunk: 'storybook' },
                                //{ match: /react@/, chunk: 'react' },
                                //{ match: /react-dom@/, chunk: 'react-dom' },
                                //{ match: /@emotion/, chunk: 'emotion' },
                                //{ match: /@chakra-ui/, chunk: 'chakra-ui' },
                            ]
                            for (let v of vendors) {
                                if (id.match(v.match)) return v.chunk;
                            }

                            if (id.includes('node_modules')) {
                                return 'vendor';
                            }
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
