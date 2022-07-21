# Web3 Redux
This is the main Redux library that is meant to abstract state management regardless of the used UI Framework.

## Build
The project is built in Typescript and is transpiled to JS using [esbuild](https://esbuild.github.io/). When developing we recommend building in watch mode which you can do using the command below.

```bash
cd packages/web3-redux
npm run build:watch
```

## Project Layout
At the top level of our `packages/web3-redux/src/` folder we have the following directory structure. You'll notice these are mostly organized by data model, where each folder contains all the logic to process a specific type of blockchain data or API data.
Some important folders include:
* `crud/createCRUDModel.ts`: General CRUD model factory function, this is the base for all data models for generic `CREATE`, `READ`, `UPDATE`, `DELETE` operations. Creates basic actions, sagas, hooks, and selectors used by all data models.
* `db.ts`: Dexie.js IndexedDB persistent state
* `orm.ts`: Redux-Orm in-memory state
* `store.ts`: Redux store combing reducers, sagas, and other middleware

```bash
📦contracts
 ┣ 📜all.sol    #Export relevant OpenZeppelin contracts (ERC20,ERC721,ERC1155,ERC165)
📦src
 ┣ 📂4byte      #4byte.directory API store sha-256 pre-images for events/function calls
 ┣ 📂abis       #Import for artifacts & typechain types
 ┣ 📂artifacts  #(generated) Artifacts for common contracts (ERC20,ERC721,ERC1155,ERC165)
 ┣ 📂block      #Ethereum Block
 ┣ 📂config     #Global Config (current account, IPFS url)
 ┣ 📂contract   #Smart Contract or Externally Owned Account with an Ethereum address
 ┣ 📂contractevent  #Smart Contract event log
 ┣ 📂contracteventquery #Cache event log queries across block ranges
 ┣ 📂contractsend   #Smart Contract send signed transaction
 ┣ 📂crud       #Generic CRUD Model
 ┣ 📂error      #Store Redux Errors
 ┣ 📂ethcall    #Ethereum Call
 ┣ 📂ipfs       #IPFS read/write
 ┣ 📂network    #Network configs, store web3 instance
 ┣ 📂sync       #Dynamic Sync middleware. Quickly add logic to dispatch actions if a new Block/Event/Transaction matching filter parameters is detected.
 ┣ 📂test       #Test data
    ┗📜mochaHooks.ts    #Mocha hooks beforeAll, afterAll
 ┣ 📂transaction    #Ethereum Transaction
 ┣ 📂typechain  #(generated) Typechain types for common contracts (ERC20,ERC721,ERC1155,ERC165)
 ┣ 📂types      #Typescript type annotations
 ┣ 📂utils      #Utility functions
 ┣ 📜db.ts      #Dexie.js IndexedDB persistent state
 ┣ 📜environment.ts     #Environment variables and their defaults
 ┣ 📜index.ts   #Root export all modules
 ┣ 📜orm.ts     #Redux-Orm in-memory state
 ┣ 📜reducer.ts #Root reducer, dispatches reducer actions to corresponding model reducers
 ┣ 📜saga.ts    #Root saga, spawns model root sagas
 ┣ 📜state.ts   #redux-orm state interface, used for certain tests and give a high-level overview of the Redux store since redux-orm does not have tyypes
 ┗ 📜store.ts   #default redux store and redux store factory functions, compose with custom reducers to integrate web3-redux to existing store
```

### Data Models
Most of the model directories (block, transaction, contract...) then have the following structure:
```bash
📦<model>
 ┣ 📂actions    #Custom Redux actions
 ┣ 📂hooks      #Custom React hooks
 ┣ 📂middleware #Redux middleware
 ┣ 📂model      #Define the model interface and any other utilities such as validation
    ┣📜interface.ts #Define model interface, Dexie indices
    ┣📜orm.ts       #Define Redux-ORM Class
    ┗📜validate.ts  #Define validation logic (sometimes included in interface.ts)
 ┣ 📂sagas      #Custom Sagas (eg. RPC requests)
 ┣ 📂selectors  #Custom Redux selectors
 ┣ 📜crud.ts    #Basic CRUD model created using factory createCRUDModel()
 ┗ 📜index.ts   #Export all modules (actions, sagas, hooks, selectors)
```

## Test
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
