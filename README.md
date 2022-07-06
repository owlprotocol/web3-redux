# Web3 Redux
[![NPM Package Version][npm-image-version]][npm-url]
[![NPM Package Downloads][npm-image-downloads]][npm-url]
![web3-redux-1024x256.svg](./packages/web3-redux-docs/static/img/web3-redux-1024x256.svg)

A Redux library designed to efficiently sync and normalize blockchain data synced using [web3.js](https://github.com/ChainSafe/web3.js) and [redux](https://github.com/reduxjs/redux).

## TL;DR
```
pnpm install @owlprotocol/web3-redux @owlprotocol/web3-redux-components
```

## Projects
* [web3-redux](./packages/web3-redux): Web3-Redux core library
* [web3-redux-components](./packages/web3-redux-components): Web3-Redux React Component library
* [web3-redux-docs](./packages/web3-redux-docs): Docusaurus documentation.

## Docs
See the official documentation at [owlprotocol.github.io/web3-redux/][gh-page]

## Local Development
These instructions are only relevant if you are looking to contribute to web3-redux.
#### Install
```
git clone git@github.com:owlprotocol/web3-redux.git
pnpm install
pnpm install #Bug https://github.com/owlprotocol/web3-redux/issues/130
```
Make sure to run the install **twice** if running a fresh install (this is due to a bug of how pnpm attempts to link the local dependency before it's transpiled). This is only required on initial install.

#### Web3 Redux Watch Build
Run a watch build process to automatically re-build Typescript code on change.
```
cd packages/web3-redux
pnpm run build:watch # Runs tsc:watch typecheck + esbuild:watch build
```
#### Web3 Redux Components Storybook
Run storybook with Hot Module Replacement while developing UI Components.
```
cd packages/web3-redux-components
pnpm run storybook # Runs storybook with Vite
```
#### Research
See [RESEARCH.md](./RESEARCH.md) for known issues and challenges.

## Storybook
We use StorybookJS for implementing components in an isolated environment. Check out [STORYBOOK.md](./STORYBOOK.md) for more info on how to get setup.

## License
2021 Owl Protocol
MIT License.

[repo]: https://github.com/owlprotocol/web3-redux
[gh-page]: https://owlprotocol.github.io/web3-redux/
[gh-page-contributor]: https://owlprotocol.github.io/web3-redux/

[npm-image-version]: https://img.shields.io/npm/v/@owlprotocol/web3-redux.svg
[npm-image-downloads]: https://img.shields.io/npm/dm/@owlprotocol/web3-redux.svg
[npm-url]: https://npmjs.org/package/@owlprotocol/web3-redux
