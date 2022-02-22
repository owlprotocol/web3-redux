## Architecture

Overview of the overall architecture of the library.

![Flowchart.svg](/img/web3-redux-flowchart.svg)

-   All web3-redux data is stored under the `web3Redux` slice of the store as a normalized json store (State). The overall interface of the state can be found under [State](./interfaces/State).
-   [Selectors](https://github.com/reduxjs/reselect) for each [redux-orm](https://github.com/redux-orm/redux-orm) model are the preferred way to then read this data.
-   Redux ORM models are meant to represent blockchain data such as [Account](./interfaces/Account), [Block](./interfaces/Block), [Transaction](./interfaces/Transaction), [ContractEvent](./interfaces/ContractEvent)
-   State is mutated by the dispatching of Actions. Actions can be synchronous, for simple CRUD operations on the state, or asynchronous, for network fetch operations. Async actions are handled by [redux-saga](https://github.com/redux-saga/redux-saga) and will usually dispatched a new CRUD action after fetching data.
-   Hooks such as `useDispatch` and `useSelector`, enable Redux components to use the React Context API to read/write to the store by combinding selectors and actions.
