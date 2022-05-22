# Known Issues
List of relevant issues on using Storybook with Vite & ES Modules in general.
## Issues
**Problem:** WTF is CommonJS vs ES Module?
**Solution:** TLDR CJS => `require`, ESM => `import`. While this is the short description, the interoperability between the two standards is the real brainf*ck. This article by Redfin Engineering **actually** explains the differences.
https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1

**Problem:** Module resolution differences between CommonJS vs ES Modules.
**Solution:** ESM enforces **explicit** imports with extension names.
https://www.typescriptlang.org/docs/handbook/esm-node.html
https://www.typescriptlang.org/tsconfig#moduleResolution

**Problem:** IPFS has electron dependency which is bloat and breaks in-browser.
**Solution:** Remove dependency in favor of direct HTTP API calls with axios.
https://github.com/ipfs/js-ipfs-utils/issues/154

**Problem:** Vite has issues bundling depedencies when installed with `pnpm` due to how it nests them.
**Solution:** Use `--shamefully-hoist` parameter to use legacy flat dependency structure used by `npm`.
https://github.com/vitejs/vite/issues/324
https://github.com/eirslett/storybook-builder-vite/issues/141

**Problem:** Storybook addons (eg. Actions tab) breaks in browser with no error.
**Solution:** This is often just caused due to some cache or bundling issue. To test that this is indeed the issue, you can try to open the storybook in a private window and see if addons work. For a better fix in your regular browser session, simply force refresh with Ctrl+R and if that doesn't work clear full cache using Application/Storage/"Clear site data".

**Problem:** How to configure my library's exports for CommonJS & ES Module distribution?
**Solution:** Use conditional exports in the `package.json`. The `exports.require` key should point to a CommonJS export (eg. `dist/cjs/index.js`) and the `exports.import` key should point to an ES Module (eg. `dist/esm/index.js`).
https://nodejs.org/api/packages.html#packages_conditional_exports
https://webpack.js.org/guides/package-exports/#conditional-syntax
https://vitejs.dev/config/#resolve-conditions

**Problem:** How to set browser fallback polyfills for NodeJS libraries.
**Solution:** Most NodeJS native libraries (eg. `crypto`) have their browser counterparts (eg. `crypto-browserify`) that can be aliased using your bundler (Webpack, Vite, ESBuild...).

https://webpack.js.org/configuration/resolve#resolvefallback
https://vitejs.dev/config/#resolve-alias
https://github.com/remorses/esbuild-plugins#readme
https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2

**Problem:** Using TS-Node with ESM.
**Solution:** TBD. Track [ts-node/issues/1007](https://github.com/TypeStrong/ts-node/issues/1007).

**Problem:** Web3-Redux uses [typed-redux-saga](https://github.com/agiledigital/typed-redux-saga) as a solution to get better type hints for redux-saga. The library also comes with a babel [macro](https://github.com/agiledigital/typed-redux-saga#babel-macro) to remove any overhead and replace imports with `redux-saga` in production. However, since the migration to ESBuild, the babel macro is no longer usable.
**Solution:** TBD. For now we simply use the library without macro replacement.

## Guides
### ESBuild
[ESBuild](esbuild.github.io) is an efficient solution for transpiling & bundling TS/JS to CJS/ESM. We no longer use the `tsc` compiler. Typescript is only used as a typechecker as the build process is delegated to esbuild.
`web3-redux` is built with ESBuild.
https://jamesthom.as/2021/05/setting-up-esbuild-for-typescript-libraries/
https://github.com/evanw/esbuild/issues/1343#issuecomment-854275822

### Vite
[Vite](https://vitejs.dev/) is a frontend bundling solution meant to be used as a replacement for Webpack. Its integration with ESBuild under the hood and static analysis of ES Modules enables Hot Module Replacement and faster iteration. Storybook now has experimental support for Vite.
`web3-redux-components` is built with Vite.
https://storybook.js.org/blog/storybook-for-vite/
https://nirtamir.com/blog/vite-in-production

### Storybook
* `Failed to fetch dynamically imported module: http://localhost:6006/.storybook/preview.tsx`: The preview.tsx file is crashing before it can even load and log proper errors. Go through it line by line, comment out the erroring lines (usually library imports) to get a proper load. Then uncomment them to get a more useful error log.

## ESLint
https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md

## Reactstrap
https://reactstrap.github.io/

## Netlify
https://www.seancdavis.com/posts/use-pnpm-with-netlify/
https://answers.netlify.com/t/using-pnpm-and-pnpm-workspaces/2759
https://answers.netlify.com/t/using-pnpm-and-pnpm-workspaces/2759/15
## Other
https://github.com/microsoft/TypeScript/pull/35148
https://github.com/igoradamenko/esbuild-plugin-alias#readme
https://bundlephobia.com/
