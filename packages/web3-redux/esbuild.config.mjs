import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
//import alias from 'esbuild-plugin-alias';
import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve';
import * as glob from 'glob';

const files = glob.default.sync('src/**/*.{ts,tsx,json}');
//console.debug(files);

const excludeNodeModulesPlugin = NodeResolvePlugin({
    extensions: ['.ts', '.js', '.json'],
    onResolved: (resolved) => {
        //console.debug(resolved)
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

/*
const aliasPlugin = alias({
    events: 'events',
    path: 'path-browserify',
    url: 'url',
});
*/

const ESBUILD_WATCH = process.env.ESBUILD_WATCH === 'true' || process.env.ESBUILD_WATCH === '1';
const watch = ESBUILD_WATCH
    ? {
        onRebuild: (error) => {
            if (error) console.error('watch esbuild failed:', error);
            else console.log('watch esbuild succeeded');
        },
    }
    : false;

const baseConfig = {
    sourcemap: 'external',
    //platform: 'node', //'browser',
    //target: 'es6',
    inject: ['./react-shim.mjs'],
    plugins: [excludeNodeModulesPlugin, copyStaticFilesPlugin],
    watch,
};

//CJS Library
await esbuild.default.build({
    entryPoints: files,
    bundle: false,
    outdir: 'lib/cjs',
    //outExtension: { '.js': '.cjs' },
    format: 'cjs',
    ...baseConfig,
});
//ESM Library
/*
await esbuild.default.build({
    entryPoints: files,
    bundle: false,
    outdir: 'lib/esm',
    format: 'esm',
    ...baseConfig,
});
*/

//CJS Bundle
await esbuild.default.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'lib/dist/index.js',
    format: 'cjs',
    external: ['url', 'events', 'path'],
    ...baseConfig,
});

await esbuild.default.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outfile: 'lib/dist/index.min.js',
    format: 'cjs',
    external: ['url', 'events', 'path'],
    ...baseConfig,
});

/*
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
