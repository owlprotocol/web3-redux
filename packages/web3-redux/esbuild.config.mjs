import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve';
import babel from 'esbuild-plugin-babel';

import * as glob from 'glob';

const files = glob.default.sync('src/**/*.{ts,tsx,json}');
//console.debug(files);

const excludeNodeModulesPlugin = NodeResolvePlugin({
    extensions: ['.ts', '.js', '.json'],
    onResolved: (resolved) => {
        if (resolved.includes('node_modules')) {
            return {
                external: true,
            };
        }
        return resolved;
    },
});

const copyStaticFilesPlugin = copy({
    assets: {
        from: ['src/abis/**/*.json'],
        to: ['abis'],
    },
    once: true,
    verbose: false,
    keepStructure: true,
});

const babelPlugin = babel({
    config: {
        presets: [['@babel/preset-env', { modules: false }]],
        plugins: ['babel-plugin-macros'],
    },
});

//CJS Library
await esbuild.default.build({
    entryPoints: files,
    bundle: false,
    outdir: 'lib/cjs',
    plugins: [excludeNodeModulesPlugin, copyStaticFilesPlugin],
    sourcemap: 'external',
    platform: 'node', //'browser',
    format: 'cjs',
    inject: ['./react-shim.mjs'],
});
/*
//ESM Library
await esbuild.default.build({
    entryPoints: files,
    bundle: false,
    outdir: 'lib/esm',
    plugins: [excludeNodeModulesPlugin],
    sourcemap: 'external',
    platform: 'node', //'browser',
    format: 'esm',
});

//CJS Bundle
await esbuild.default.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist/cjs',
    //outfile: 'lib-es/index.js',
    //external: ['path', 'events', 'url'], //override, only loaded in Node environment
    plugins: [excludeNodeModulesPlugin],
    //sourcemap: 'external',
    platform: 'node', //'browser',
    format: 'cjs',
});

//ESM Bundle
await esbuild.default.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist/esm',
    //outfile: 'lib-es/index.js',
    //external: ['path', 'events', 'url'], //override, only loaded in Node environment
    plugins: [excludeNodeModulesPlugin],
    //sourcemap: 'external',
    platform: 'node', //'browser',
    format: 'esm',
});
*/
