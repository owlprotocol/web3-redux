---
sidebar_position: 3.2
---

# Contract - Smart Contracts

These hooks are used for smart contracts that host EVM bytecode. The main uses cases are method calls and event logs.

## useContractCall

Make a contract call.

```tsx
const tokenBalance = Contract.useContractCall(networkId, address, 'balanceOf', [account]);
```

**Reference:** [Contract.useContractCall](../web3-redux-reference/namespaces/Contract.md#usecontractcall)

## useEvents

Get past or sync contract event logs.

```tsx
const Transfer = Contract.useEvents(networkId, address, 'Transfer', filter, { past: true, sync: true });
```

**Reference:** [Contract.useEvents](../web3-redux-reference/namespaces/Contract.md#useevents)

:::tip
The `filter` parameter can be used to filter events by indexed `returnValues` fields. This leverages the indexing features of event logs and is often required to efficiently query only the relevent events.
:::
:::caution
Getting past events can be an expensive operation. We recommend limiting the amount of data queried using filters or block range parameters.
:::
:::caution
While some features of Web3-Redux might work with an HTTP (`http://`) connection, subscriptions **REQUIRE** a network configured with a websocket (`ws://`) connection.
:::
