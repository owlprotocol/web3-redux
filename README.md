# Web3 Redux Monorepo

## TL;DR
```
git clone git@github.com:owlprotocol/web3-redux.git
pnpm install
pnpm run bootstrap
pnpm run test
```

## Projects
* [web3-redux](./packages/web3-redux): Core Web3-Redux library
* [web3-redux-components](./packages/web3-redux-components): Web3-Redux React Component library
* [web3-redux-docs](./packages/web3-redux-docs): Docusaurus documentation.

## Lerna
This monorepo uses [lerna.js](https://lerna.js.org/) for package management. Lerna enables project-level local package management in a development environment. This avoids having to deploy an actively developed library to a package registry when simply looking to use it with another project. Make sure that packages refer to the correct local version otherwise lerna will try to fetch the version stored on npmjs.
Install your dependencies
```
pnpm run bootstrap
```
Lerna will link your packages and download the required dependencies.



https://github.com/pnpm/pnpm/issues/2959
