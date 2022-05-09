import { defineConfig } from 'vite';

//Rollup Plugins
import rollupInject from '@rollup/plugin-inject';

//Vite Plugins
//import ReplacePlugin from '@rollup/plugin-replace';
import ReactPlugin from '@vitejs/plugin-react';
//import EnvironmentPlugin from 'vite-plugin-environment';
import CheckerPlugin from 'vite-plugin-checker';
import SVGRPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: 'globalThis',
    },
    optimizeDeps: {
        include: ['@owlprotocol/web3-redux', '@owlprotocol/web3-redux-components'],
    },
    plugins: [
        //Use Replace Plugin to replace dependencies as well
        /*
        ReplacePlugin({
            values: {
                'process.env.VITE_APP_TITLE': JSON.stringify('Vite Starter Test'),
            },
            preventAssignment: true,
        }),
        */
        ReactPlugin(),
        rollupInject({
            Buffer: ['buffer', 'Buffer'],
        }),
        //Expose envars with traditional process.env
        //EnvironmentPlugin('all', { prefix: 'VITE_' }),
        SVGRPlugin(),
        CheckerPlugin({
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
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
            web3: 'web3/dist/web3.min.js',
        },
    },
    build: {
        rollupOptions: {},
    },
});
