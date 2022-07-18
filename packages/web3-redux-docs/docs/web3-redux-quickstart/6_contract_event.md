---
sidebar_position: 6
label: 'Contract Call'
---

# Contract Event

A contract event log is like notification on the blockchain that some data has changed. Event logs are indexed separately and are an efficient way to get past updates or listen to new ones. The ERC20 token `Transfer(from, to, value)` event is emitted whenever a token is transferred for example.

## Past Events

Fetching past events can help you display historical changes in the smart contract's state. Web3-Redux uses the [web3.eth.Contract.events.getPastEvents](https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#getpastevents) API to get past events.

The `useEvents` hook can help us easily achieve fetch contract events. To get past events, enable the `past` option of the hook.

```tsx
import { Contract } from '@leovigna/web3-redux';
const ERC20Component = ({ networkId, address, account }) => {
    const filter = { from: account }; //Filter only Transfer sent by account
    // Sync events
    const pastTransfers = Contract.useEvents(networkId, address, 'Transfer', filter, {
        past: true,
        fromBlock: 'earliest',
        toBlock: 'latest',
    });
    //...
};
```

:::tip
The `filter` parameter is used to only query Transfer events from `account`. This leverages the indexing features of event logs and is often required to efficiently query only the relevent events.
:::
:::caution
Getting past events can be an expensive operation. We recommend limiting the amount of data queried using filters or block range parameters.
:::

## Event Subscription

Event subscriptions can enable your app to efficiently get updates regarding a smart contract without having to poll every block. Web3-Redux uses the [web3.eth.Contract.events.MyEvent](https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#contract-events) API to sync new events.

To get updates on new events, enable the `sync` option of the hook. The Web3-Redux event subscription hook is configured to automatically start/stop the correct subscription if any relevant parameters of the hook change: this avoids having "zombie" subscriptions that continue syncing a contract that is no longer needed.

```tsx
import { Contract } from '@leovigna/web3-redux';
const ERC20Component = ({ networkId, address, account }) => {
    const filter = { from: account }; //Filter only Transfer sent by account
    // Sync events
    const newTransfers = Contract.useEvents(networkId, address, 'Transfer', filter, { sync: true });
    //...
};
```

:::caution
While some features of Web3-Redux might work with an HTTP (`http://`) connection, subscriptions **REQUIRE** a network configured with a websocket (`ws://`) connection.
:::

## All Events

To fetch all events (both past and new updates) simply enable both `sync` and `past` options.
