import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve';
import * as esbuild from 'esbuild';
import * as glob from 'glob';

const files = glob.default.sync('src/**/*.{ts,tsx,json}');
await esbuild.default
    .build({
        entryPoints: files, //['src/index.ts'],
        bundle: true,
        outdir: 'lib/esm',
        //outfile: 'lib-es/index.js',
        //external: ['path', 'events', 'url'], //override, only loaded in Node environment
        plugins: [
            //@ts-ignore
            NodeResolvePlugin({
                extensions: ['.ts', '.js'],
                onResolved: (resolved) => {
                    if (resolved.includes('node_modules')) {
                        return {
                            external: true,
                        };
                    }
                    return resolved;
                },
            }),
            {
                name: 'resolve-ts',
                setup(build) {
                    build.onResolve({ filter: /.*/ }, (args) => {
                        console.debug(args);
                        if (args.kind === 'entry-point') return;
                        let path = args.path;
                        if (!path.endsWith('.js')) path += '.js';
                        return { path, external: true };
                    });
                },
            },
        ],
        //sourcemap: 'external',
        platform: 'node', //'browser',
        format: 'esm',
    })
    .catch(() => process.exit(1));
