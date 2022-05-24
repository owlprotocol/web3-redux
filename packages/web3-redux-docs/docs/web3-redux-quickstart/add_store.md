---
sidebar_position: 2
label: 'Configure Store'
---

# Initialize the Redux Store

In this quickstart example, we will be using the default Web3-Redux store. You may also leverage a more complex setup depending on your needs:

-   Enable persistance middleware using [redux-persist](https://github.com/rt2zz/redux-persist). See [Advanced/Persistence](/docs/web3-redux-advanced/persistence)
-   Integrate web3-redux with existing redux store. This is often required in more complex applications that need to store their own state. See [Advanced/Custom Store](../web3-redux-advanced/custom_store.md).

To setup our store, we follow the standard `react-redux` configuration [guide](https://redux.js.org/usage/configuring-your-store). Add a `Provider` component to wrap the entire React app with the redux context.

```tsx
//index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from '@owlprotocol/web3-redux/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
```
