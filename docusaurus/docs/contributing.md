---
sidebar_position: 7
---

# Contributing

## Project Management

`web3-redux` was originally created by [@leovigna](https://github.com/leovigna) and is now actively maintained by [@owlprotocol](https://github.com/owlprotocol) as a library used in all of our DApps. The library is MIT licensed and anyone is free to contribute.

Before you do we recommend the following:

-   Read through the docs and reference
-   Integrate `web3-redux` into one of your DApps
-   Fork the repo and run the test suite (some tests might fail due to missing API keys)

If you'd like to contribute:

-   Look for an existing [issue](https://github.com/owlprotocol/web3-redux/issues), and comment if interested in researching/implementing
-   Create a [new issue](https://github.com/owlprotocol/web3-redux/issues/new) for feature requests/bugs

Current areas of research include:

-   Debugging & Error Handling middleware
-   Test coverage & Additional Continuous Integration
-   Additional documentation & guides
-   Web3 RPC Optimizations (Multicall Contract, HTTP Batching)
-   Indexing integrations (Etherscan, The Graph)
-   Non-EVM blockchains (eg. Solana, Cardano)
-   Pre-configured "meta-hooks" for common interfaces
    -   ERC165, ERC20, ERC721, ERC1155 already implemented
-   Pre-built React components ([web3-redux-components](https://github.com/owlprotocol/web3-components))

## Project Setup

### Build

The project is built in Typescript and needs to be transpiled to JS. When developing we recommend building in watch mode which you can do using the command below.

```bash
npm run build:watch
```

### Test

We use the following libraries for testing:

-   [mocha](https://mochajs.org/) As a testing framework. Our `.mocharc.json` file is configured to run tests in parallel on 8 processes.
-   [chai](https://www.chaijs.com/) As an test assertion library

Common actions in the `before()` or `beforeEach()` step of test suites include:

-   Setting up the store
-   Dispatching actions to the store to populate with test data (eg. Configure Network)
-   Setting up a `ganache-core` test Web3 provider (test blockchain)
-   Deploying test smart contracts (eg. Deploy ERC20 contract)

When running tests we recommend the following best practices:

-   Run individual test files with `mocha lib/<path-to-file>`
-   Run tests with event logging middleware `LOG_REDUX_ACTIONS=1 mocha lib/<path-to-file>`
-   If a test files contains many unit tests consider temporarily skipping sum by refactoring them to use `it.skip('MyTest, () => ...)`. Mocha will the test description but won't execute the test.

**Testing Hooks**
`web3-redux` supports React hooks to simplify integration with React components. These are **NOT** required however, and other non-React projects can still integrate all of the other Redux-based features for state management (actions, sagas, selectors).
Testing React Hooks requires introducing additional libraries to simulate the DOM and how hooks update:

-   [mocha-jsdom](https://github.com/rstacruz/mocha-jsdom) to quickly configure JSDOM with Mocha.
-   [@testing-library/react-hooks](https://react-hooks-testing-library.com/) to test render hooks

### Project Layout

This section aims to discuss the layout of the `web3-redux` project for potential contributors or developers looking to debug the library by looking at the source code.

At the top level of our `src/` folder we have the following directory structure. You'll notice these are mostly organized by data model, where each folder contains all the logic to process a specific type of blockchain data or API data.

```bash
📦src
 ┣ 📂4byte #4byte.directory API store sha-256 pre-images for events/function calls
 ┣ 📂abis  #Artifacts for test contracts and hooks (ERC20,ERC721,ERC1155,ERC165)
 ┣ 📂block  #Ethereum Block
 ┣ 📂config #Global config object to store configs (current account, IPFS url)
 ┣ 📂contract #Smart Contract or Externally Owned Account with an Ethereum address
 ┣ 📂contractevent #Smart Contract event log
 ┣ 📂contracteventindex #Custom index for events
 ┣ 📂ethcall #Ethereum Call
 ┣ 📂ipfs #IPFS read/write
 ┣ 📂network #Network config, store web3 instance for different EVM networks indexed by network id
 ┣ 📂sync #Dynamic Sync middleware. Quickly add logic to dispatch actions if a new Block/Event/Transaction matching filter parameters is detected.
 ┣ 📂test #Test data
 ┣ 📂transaction #Ethereum Transaction
 ┣ 📂types #Typescript type annotations for JS libraries/Solidity smart contracts
 ┣ 📂utils #Utility functions for testing and parsing data
 ┣ 📜environment.ts #Environment variables and their defaults
 ┣ 📜index.ts #Root export all modules
 ┣ 📜orm.ts #Configure redux-orm instance with all models
 ┣ 📜reducer.ts #Root reducer, dispatches reducer actions to corresponding model reducers
 ┣ 📜saga.ts #Root saga, spawns model root sagas
 ┣ 📜state.ts #redux-orm state interface, used for certain tests and give a high-level overview of the Redux store since redux-orm does not have tyypes
 ┣ 📜store.ts #default redux store and redux store factory functions, compose with custom reducers to integrate web3-redux to existing store
 ┗ 📜transform.ts #redux-persit transform function used to strip out non-serializable items from the state before encoding to storage
```

Most of the model directories (block, transaction, contract...) then have the following structure:

```bash
📦model
 ┣ 📂actions #Redux actions defining CRUD actions (eg. CREATE) and async saga actions (eg. FETCH)
 ┣ 📂hooks #React hooks to help integrate frontend components. Combines selectors & actions to read data and dispatch network request actions.
 ┣ 📂middleware #Redux middleware to synchronously dispatch additional actions before/after an action is received
 ┣ 📂model #Define the model interface and any other utilities such as validation
 ┣ 📂sagas #Process async actions such as network requests using redux-saga
 ┗ 📂selectors #These parse out the state to select one or multiple instances of the data
```
