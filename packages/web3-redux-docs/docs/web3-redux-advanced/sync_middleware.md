---
sidebar_position: 3
label: 'Sync Middleware'
---

# Sync Middleware

Web3-Redux comes with a built-in Sync model which serves as a form of dynamic middleware that can be added, removed, and customized. There are three types of syncs: [BlockSync](../web3-redux-reference/interfaces/Sync.BlockSync.md), [EventSync](../web3-redux-reference/interfaces/Sync.EventSync.md), and [TransactionSync](../web3-redux-reference/interfaces/Sync.TransactionSync.md) which each can trigger actions upon receiving updates to a new block, new event or new transaction, respectively.

Sync middleware can be useful when looking to dispatch your own custom Redux action as a result of some blockchain update. They are also used as the building blocks for the Contract Call sync.

## Base Sync

All sync middleware shares the following parameters:

-   `id`: This must be a unique id that defines the middleware and can be used to remove it in the future.
-   `actions`: These actions are dispatched whenever the sync middleware is triggered.

## Bock Sync

This middleware listens for [Block/CREATE](../web3-redux-reference/namespaces/Block.md#create) actions, and if `block.number % matchBlockNumberModulo == 0`, it will dispatch its `actions`. A `matchBlockNumberModulo` value of `1` would imply dispatching on every block.

```typescript
Sync.create({ id: '1', type: 'Block', matchBlockNumberModulo: 1, actions });
```

**Reference:** [BlockSync](../web3-redux-reference/interfaces/Sync.BlockSync.md)

## Event Sync

This middleware listens for [ContractEvent/CREATE](../web3-redux-reference/namespaces/ContractEvent.md#create) actions, and if an event matches its `matchAddress`, `matchName` and `matchReturnValues`, will dispatch its `actions`.
The following example filters for `Transfer` events:

```typescript
Sync.create({ id: '1', type: 'Event', matchAddress: address, matchName: 'Transfer', actions });
```

:::note
An event sync middleware is **NOT** the same as an event subscription. Sync middleware simply watches the local redux store and dispatches additional actions. This does not create a new Web3 subscription.
:::

**Reference:** [EventSync](../web3-redux-reference/interfaces/Sync.EventSync.md)

## Transaction Sync

This middleware listens for [Transaction/CREATE](../web3-redux-reference/namespaces/Transaction.md#create) actions and if an transaction matches its `matchFrom` and `matchTo` parameteres, will dispatch its `actions`.
The following example filters for tranaction from a particular sender:

```typescript
Sync.create({ id: '1', type: 'Transaction', matchFrom: account, actions }));
```

**Reference:** [TransactionSync](../web3-redux-reference/interfaces/Sync.TransactionSync.md)

## Sync

Type union of Block/Event/Transaction Syncs.

**Reference:** [Sync](../web3-redux-reference/namespaces/Sync.md#sync)
