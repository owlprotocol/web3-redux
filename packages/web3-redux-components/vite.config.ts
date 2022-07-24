import { defineConfig } from 'vite';

//Rollup Plugins
import rollupInject from '@rollup/plugin-inject';

//Vite Plugins
import ReactPlugin from '@vitejs/plugin-react';
import CheckerPlugin from 'vite-plugin-checker';
import SVGRPlugin from 'vite-plugin-svgr';
import DTSPlugin from 'vite-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
    define: {
        //patch ipfs utils
        'globalThis.process.env.NODE_ENV': JSON.stringify('development'),
    },
    plugins: [
        ReactPlugin(),
        SVGRPlugin({
            svgrOptions: {
                icon: '100%',
            },
        }),
        DTSPlugin(),
        CheckerPlugin({
            typescript: true,
            overlay: true,
            eslint: {
                lintCommand: 'eslint .  --ext .ts,.tsx',
            },
        }),
    ],
    resolve: {
        alias: {
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
            events: 'rollup-plugin-node-polyfills/polyfills/events',
            http: 'rollup-plugin-node-polyfills/polyfills/http',
            https: 'rollup-plugin-node-polyfills/polyfills/https',
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
            util: 'rollup-plugin-node-polyfills/polyfills/util',
            web3: 'web3/dist/web3.min.js',
        },
    },
    build: {
        //Library Mode
        //https://vitejs.dev/guide/build.html#library-mode
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Web3ReduxComponentsLib',
            fileName: (format) => `web3-redux-components-lib.${format}.js`,
        },
        rollupOptions: {
            plugins: [
                rollupInject({
                    Buffer: ['buffer', 'Buffer'],
                }),
            ],
            //Library Mode
            external: [
                '@chakra-ui/react',
                '@emotion/react',
                '@emotion/styled',
                '@fortawesome/fontawesome-svg-core',
                '@fortawesome/free-solid-svg-icons',
                '@fortawesome/react-fontawesome',
                '@ipld/dag-cbor',
                '@ipld/dag-pb',
                '@owlprotocol/web3-redux',
                '@walletconnect/encoding',
                '@walletconnect/ethereum-provider',
                '@walletconnect/jsonrpc-http-connection',
                '@walletconnect/jsonrpc-provider',
                '@web3-react/coinbase-wallet',
                '@web3-react/core',
                '@web3-react/eip1193',
                '@web3-react/empty',
                '@web3-react/gnosis-safe',
                '@web3-react/metamask',
                '@web3-react/network',
                '@web3-react/types',
                '@web3-react/url',
                '@web3-react/walletconnect',
                'chakra-react-select',
                'classnames',
                'copy-to-clipboard',
                'ethereum-qr-code',
                'framer-motion',
                'ipfs-http-client',
                'js-base64',
                'lodash',
                'rc-pagination',
                'react',
                'react-dom',
                'react-hook-form',
                'react-hooks-compose',
                'react-redux',
                'react-router',
                'react-router-dom',
                'redux',
                'web3',
            ],
            output: {
                globals: {
                    '@chakra-ui/react': 'ChakraUI',
                    '@emotion/react': 'EmotioReact',
                    '@emotion/styled': 'EmotionStyled',
                    '@owlprotocol/web3-redux': 'Web3Redux',
                    '@web3-react/abstract-connector': 'Web3ReactAbstractConnector',
                    '@web3-react/metamask': 'Web3ReactMetamask',
                    '@web3-react/core': 'Web3ReactCore',
                    '@web3-react/injected-connector': 'Web3ReactInjectedConnector',
                    classnames: 'classnames',
                    'copy-to-clipboard': 'CopyToCliboard',
                    'ethereum-qr-code': 'EthereumQRCode',
                    'framer-motion': 'FramerMotion',
                    lodash: 'Lodash',
                    'rc-pagination': 'RcPagination',
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-hooks-compose': 'ReactHooksCompose',
                    'react-redux': 'ReactRedux',
                    'react-router-dom': 'ReactRouterDOM',
                    web3: 'Web3',
                },
            },
        },
    },
});
