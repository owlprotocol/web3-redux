---
sidebar_position: 0
---

# Contributing

`web3-redux` was originally created by [@leovigna](https://github.com/leovigna) and is now actively maintained by [@owlprotocol](https://github.com/owlprotocol) as a library used in all of our DApps. The library is MIT licensed and anyone is free to contribute.

Before you do we recommend the following:

-   Read through the docs and reference
-   Integrate `web3-redux` into one of your DApps
-   Understand the general `web3-redux` [architecture](../web3-redux-advanced/architecture.md)
-   Fork the repo and run the test suite (some tests might fail due to missing API keys)

If you'd like to contribute:

-   Look for an existing [issue](https://github.com/owlprotocol/web3-redux/issues), and comment if interested in researching/implementing
-   Create a [new issue](https://github.com/owlprotocol/web3-redux/issues/new) for feature requests/bugs

## Related Libraries
To fully understand the architecture of web3-redux, you might want to get familiar with some of the libraries this "meta-library" is built with:

**React**
-   [React Hooks](https://reactjs.org/docs/hooks-intro.html)

**Redux**
-   [redux](https://redux.js.org/)
-   [redux-saga](https://redux-saga.js.org/)
-   [redux-orm](https://redux-orm.github.io/redux-orm/)
-   [reselect](https://github.com/reduxjs/reselect)

**IndexedDB**
-   [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
-   [Dexie.js](https://dexie.org/docs/)

**Blockchain/Web3**
-   [web3.js](https://web3js.readthedocs.io/en/v1.3.0/)
-   [js-ipfs](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api)

## Research
Current areas of research include:

-   Debugging & Error Handling middleware
-   Test coverage & Additional Continuous Integration
-   Additional documentation & guides
-   Web3 RPC Optimizations (Multicall Contract, HTTP Batching)
-   Indexing integrations (Etherscan, The Graph)
-   Non-EVM blockchains (eg. Solana, Cardano, Ripple)
-   Pre-configured "meta-hooks" for common interfaces
    -   ERC165, ERC20, ERC721, ERC1155 already implemented
-   Pre-built React components ([web3-redux-components](https://github.com/owlprotocol/web3-components))

## Project Setup
### Install
Install depedencies using [pnpm](https://pnpm.io/).
```bash
git clone git@github.com:owlprotocol/web3-redux.git
pnpm i
```

## Projects
This section aims to discuss the layout of the `web3-redux` repo and underlying packages for potential contributors or developers looking to debug the library by looking at the source code.

We use a monorepo architecture with various related projects stored under `packages/`:
* [web3-redux](./1_web3-redux.md): Web3-Redux core library
* [web3-redux-components](./2_web3-redux-components.md): Web3-Redux React Component library
* web3-redux-docs: Docusaurus documentation.
