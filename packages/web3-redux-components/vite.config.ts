import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//Typescript, ESLint check
import Checker from 'vite-plugin-checker';
//SVGR
import svgrPlugin from 'vite-plugin-svgr';

//NodeJS Polyfills
//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
//import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import dts from 'vite-dts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        //https://vitejs.dev/config/#optimizedeps-include
        include: [],
        // Enable esbuild polyfill plugins
        esbuildOptions: {
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true,
                }),
                //NodeModulesPolyfillPlugin(),
            ],
        },
    },
    plugins: [
        react(),
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
        }),
    ],
    resolve: {
        alias: {
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
            http: 'rollup-plugin-node-polyfills/polyfills/http',
            https: 'rollup-plugin-node-polyfills/polyfills/http',
        },
    },
    build: {
        //Library Mode
        //https://vitejs.dev/guide/build.html#library-mode
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Web3ReduxComponents',
            fileName: (format) => `${format}/index.js`,
        },
        rollupOptions: {
            //Library Mode
            external: [
                '@owlprotocol/web3-redux',
                '@web3-react/abstract-connector',
                '@web3-react/core',
                '@web3-react/injected-connector',
                'bootstrap',
                'react',
                'react-dom',
                'react-hooks-compose',
                'react-redux',
                'react-router-dom',
                'reactstrap',
                'styled-components',
                'web3-utils',
            ],
            output: {
                globals: {
                '@owlprotocol/web3-redux': 'Web3Redux',
                '@web3-react/abstract-connector': 'Web3ReactAbstractConnector',
                '@web3-react/core': 'Web3ReactCore',
                '@web3-react/injected-connector': 'Web3ReactInjectedConnector',
                'bootstrap': 'Bootstrap',
                'react': 'React',
                'react-dom': 'ReactDOM',
                'react-hooks-compose': 'ReactHooksCompose',
                'react-redux': 'ReactRedux',
                'react-router-dom': 'ReactRouterDOM',
                'reactstrap': 'Reactstrap',
                'styled-components': 'StyledComponents',
                'web3-utils': 'Web3Utils',
                },
            },
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                rollupNodePolyFill(),
                dts(), //Generate .d.ts in production
            ],
        },
    },
});
