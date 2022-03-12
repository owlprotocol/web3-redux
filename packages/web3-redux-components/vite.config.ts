import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//Typescript, ESLint check
import Checker from 'vite-plugin-checker';

//NodeJS Polyfills
//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
//import path from 'path';
//import dts from 'vite-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
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
            // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
            // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
            // process and buffer are excluded because already managed
            // by node-globals-polyfill
            util: 'rollup-plugin-node-polyfills/polyfills/util',
            sys: 'util',
            events: 'rollup-plugin-node-polyfills/polyfills/events',
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
            path: 'rollup-plugin-node-polyfills/polyfills/path',
            querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
            punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
            url: 'rollup-plugin-node-polyfills/polyfills/url',
            string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
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
        },
    },
    optimizeDeps: {
        //https://vitejs.dev/config/#optimizedeps-include
        include: ['@owlprotocol/web3-redux'],
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true,
                }),
                NodeModulesPolyfillPlugin(),
            ],
        },
    },
    build: {
        /*
        //Library Mode
        //https://vitejs.dev/guide/build.html#library-mode
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'MyComponentLib',
            fileName: (format) => `my-component-lib.${format}.js`,
        },
        */
        rollupOptions: {
            /*
            //Library Mode
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
            */
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                rollupNodePolyFill(),
                //dts(), //Generate .d.ts in production
            ],
        },
    },
});
