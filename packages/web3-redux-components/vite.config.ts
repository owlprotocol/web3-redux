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
export default defineConfig({
    plugins: [
        ReactPlugin(),
        rollupInject({
            Buffer: ['buffer', 'Buffer'],
        }),
        SVGRPlugin({
            svgrOptions: {
                // This attr replaces SVG size to be 1em,
                // Icon size better determined by its container.
                icon: '100%',
            },
        }),
        CheckerPlugin({
            typescript: true,
            overlay: true,
            eslint: {
                lintCommand: 'eslint --ext .ts,.tsx src --fix',
            },
        }),
        DTSPlugin(),
    ],
    resolve: {
        alias: {
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
            http: 'rollup-plugin-node-polyfills/polyfills/http',
            https: 'rollup-plugin-node-polyfills/polyfills/http',
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
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
            //Library Mode
            external: [
                '@chakra-ui/react',
                '@emotion/react',
                '@emotion/styled',
                '@owlprotocol/web3-redux',
                '@web3-react/abstract-connector',
                '@web3-react/core',
                '@web3-react/injected-connector',
                'classnames',
                'copy-to-clipboard',
                'ethereum-qr-code',
                'framer-motion',
                'lodash',
                'rc-pagination',
                'react',
                'react-dom',
                'react-hooks-compose',
                'react-redux',
                'react-router-dom',
                'web3',
            ],
            output: {
                globals: {
                    '@chakra-ui/react': 'ChakraUI',
                    '@emotion/react': 'EmotioReact',
                    '@emotion/styled': 'EmotionStyled',
                    '@owlprotocol/web3-redux': 'Web3Redux',
                    '@web3-react/abstract-connector': 'Web3ReactAbstractConnector',
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
