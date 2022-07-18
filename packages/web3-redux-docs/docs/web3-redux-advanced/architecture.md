---
sidebar_position: 2
---

# Architecture

Overview of the overall architecture of the library.

![Flowchart.svg](/img/web3-redux-architecture.svg)


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


## Data Models
We use the concept of a data model to refer to each type of relevant data that is stored by web3-redux and be queried on-chain (EVM) or on decentralized networks (IPFS). The data model defines the interface of the data, but also validation logic, indexing rules, and relevant actions, selectors & hooks to perform CRUD operations on the data collection. Some common data models meant to represet blockchain data include the following:
- [Block](../web3-redux-reference/interfaces/Block.BlockHeader.md)
- [Transaction](../web3-redux-reference/interfaces/Transaction.Transaction-1.md)
- [Contract](../web3-redux-reference/interfaces/Contract.Contract-1.md)

## CRUD
Before going into the different components that write to the state, it's important to understand the various possible CRUD (Create, Read, Update, Delete) operations.
* `CREATE`: Add an item. Throws error if item **exists**.
* `UPDATE`: Update an item merging attributes. Throws error if item does **not exists**.
* `PUT`: Add an item or overwrite all attributes.
* `UPSERT`: Add an item or merge attributes.
* `DELETE`: Delete an item.

The easiest to use operation is the `UPSERT` operation has it combines the logic of a `CREATE` & `UPDATE` operation. This comes at a slight performance cost however as the logic has to read to the database before determining what to write (no native IndexedDB upsert). When possible, consider using `CREATE`/`UPDATE`/`PUT`.
All of these operations have **batched** versions (`{ACTION}/BATCHED`) enabling insertion of many items in 1 transaction. `CREATE/BATCHED` for example takes an array of items to write to the database.

## State
State is stored in 2 distinct ways, persistent and in-memory.

**IndexedDB**
Persistent state is stored using [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), a modern NoSQL database for the browser supported by Chromium, Mozilla and other mainstream browsers. We used [indexeddbshim](https://github.com/indexeddbshim/indexeddbshim) to potentially support older browsers with [WebSQL](https://caniuse.com/?search=websql) and to run our NodeJS tests by emulating the IndexedDB APIs in-memory. Data stored in IndexedDB can be indexed using various indices enabling efficient queries and pagination. Data is also persistent across user sessions, enabling the web app to load with data on startup without having to make any API calls.
Most of our data models such as Block, Transaction, ContractEvent are just stored in IndexedDB but other models also have the concept of instantiated objects such as `Web3.eth.Contract` which is used for querying blockchain data. Due to the limitation that all data stored in IndexedDB must be encodable, we cannot store these objects in IndexedDB and instead opt to use a secondary in-memory redux store to store this data during the user session.
Due to the low-level complexity of IndexedDB APIs, we use [Dexie.js](https://dexie.org/) as an easy to use API wrapper for CRUD operations on IndexedDB.
For reading data, we use the Dexie provided [useLiveQuery](https://dexie.org/docs/dexie-react-hooks/useLiveQuery()) hook that enables writing a Dexie query that updates when parameters or the databases changes. For simplicity, all data models include abstractions for for common queries:
* `useGet(id|index)`
* `useGetBulk(ids|indices)`
* `useWhere(filter, {reverse,offset,limit})`

**Redux**
We use the Redux store to store models that required an instantiated object during the user session. Such objects while not directly stored in IndexedDB, usually have relevant info stored persistently.
- Config: The `ipfsUrl` data stored in IndexedDB enables instantiating the `ipfsClient` object.
- Network: The `web3Rpc` data stored in IndexedDB enables instantiating the `web3` object.
- Contract: The `address` and `abi` data stored in IndexedDB enables instating the `web3Contract` object.

All web3-redux data is stored under the `web3Redux` slice of the store as a normalized json store (State). The overall interface of the state can be found under [State](../web3-redux-reference/interfaces/State.md). To normalize the redux state, we use [redux-orm](https://redux-orm.github.io/redux-orm/) library to define models stored in redux and handle CRUD operations.

For reading data, [Selectors](https://github.com/reduxjs/reselect) for each [redux-orm](https://github.com/redux-orm/redux-orm) model are the preferred way to access the state. Some standard selectors shared by all data models:
* `selectByIdSingle(id)`: Select an single instance.
* `selectByIdMany(ids)`: Select multiple instances.
* `selectWhere(filter)`: Select by equality filter. (for complex queries, we recommend using Dexie to leverage IndexedDB indices)
Selectors have their hook counterparts, which abstract the need to pass in the state.
* `useSelectByIdSingle(id)`
* `useSelectByIdMany(ids)`
* `useSelectAll()`
* `useSelectWhere(filter)`

## Actions
State is mutated by the dispatching of Actions. Actions are **synchronously** processed by **reducers** for updates to the redux state and then **asyncrounously** processed by **sagas** for updates to the IndexedDB state as its API is asynchrounous. Other actions such as API calls to fetch data are also usually asynchrously processed by sagas. Action creators validate the payload they are given using the `validate` or `validateId` function for a specific data model.
## Reducers
Reducers are used by the redux-orm to update the redux state for all CRUD operations.

## Sagas
[redux-saga](https://github.com/redux-saga/redux-saga) is used to manage complex event loops of asynchronous actions. All data models include sagas for Dexie CRUD operations that are asynchronous.

## Hooks
We use the following building blocks of hooks to create easy to use hooks for common operations:
* `useDispatch`: Get redux dispatch to send actions.
* `useLiveQuery`: Read data from IndexedDB state.
* `useSelector`: Read data from redux state.

All data models include the following hooks:
**Dexie useLiveQuery Hooks**
* `useGet(id|index)`
* `useGetBulk(ids|indices)`
* `useWhere(filter, {reverse,offset,limit})`
**Redux useSelector Hooks**
* `useSelectByIdSingle(id)`
* `useSelectByIdMany(ids)`
* `useSelectAll()`
* `useSelectWhere(filter)`
**Other Hooks**
* `useHydrate(id)`: Hydrate redux state by reading persistent IndexedDB state & dispatching an `UPDATE` action if item exists in IndexedDB state but **not** in redux state. This is a simple way to make sure that a `Contract` model's `web3Contract` is instantianted.
