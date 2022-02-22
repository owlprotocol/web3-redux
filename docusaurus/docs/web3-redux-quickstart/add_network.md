---
sidebar_position: 2.5
label: 'Configure Network'
---

# Configure Network

## Network

All entities in the Web3-Redux store are indexed by networkId. Web3-Redux let's you sync multiple networks concurrently (eg. sync Mainnet & Ropsten blocks). The `Network` object is meant to store a global `web3` object that is responsible for connecting to the Ethereum RPC.

You must first configure a network by adding it to the store and passing it a web3 instance or an Ethereum RPC. We recomend using a websocket (`wss://`) connection as this enables more advanced usage such as subscriptions.

## Env Var Config

Web3-Redux includes built-in defaults using environment variables to easily configure your store. To enable this, set the **one** of the following envvars in your React App's `.env` file:

```bash
# .env | .env.local
REACT_APP_INFURA_API_KEY=<PROJECT_ID> #Use Infura RPC for supported networks
REACT_APP_MAINNET_RPC=ws://localhost:8546       #Set Ethereum Mainnet RPC (networkId: 1)
```

You can configure your network by simply dispatching the following create action:

```typescript
store.dispatch(Network.create({ networkId: '1',  /*web3Rpc: 'ws://localhost:8546'*/})
```

Web3-Redux will autoumatically use the envvar configured RPC as a default for supported networks (Ethereum, Testnets, Polygon). For custom networks, you can manually set the `web3Rpc` parameter in the create action.

For more details on supported envvars (additional default networks), check out [Reference/Environment](TBD).
Also see the React Documentation on [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/).

## React Config

If using React, you will want to configure the network(s) on app mount with a `useEffect` hook. Note that the component must be have access to the Redux context (see [Configure Store](./add_store.md)).

```tsx
//App.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import { Network } from '@owlprotocol/web3-redux';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Network.create({ networkId: '1' }));
    }, []); //Runs once on app mount
    //...
};
```

## Non-React Config

In pure Redux, the configuration can be set as seen below.

```typescript
import { Network } from '@leovigna/web3-redux';
store.dispatch(Network.create({ networkId: '1', web3Rpc: 'ws://localhost:8546' }));
```

## Advanced

For more dynamic configuration such as integration with Metamask, and setting up a dual configuration with a `web3Sender` object, check out [Integrations/Metamask](TBD).
