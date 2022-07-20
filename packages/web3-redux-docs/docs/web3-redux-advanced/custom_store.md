---
sidebar_position: 0
---

# Custom Redux Store

## Basic Setup

## X

## Persistence

In most situations, you will want to add web3-redux to your existing redux store. The web3Reducer MUST be stored at the `web3Redux` key in your store.

```typescript
//store.ts
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { web3Reducer, web3Saga } from '@owlprotocol/web3-redux';

const reducers = combineReducers({
    web3Redux: web3Reducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(web3Saga);

export default store;
```

Then follow the standard `react-redux` configuration [guide](https://redux.js.org/usage/configuring-your-store) to add a `Provider` component to wrap your entire React app in the redux context.

```typescript
//index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
```
