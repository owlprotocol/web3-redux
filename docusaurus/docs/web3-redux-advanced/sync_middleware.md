## Sync Middleware

`web3-redux` comes with a built-in `Sync` data model which serves as a form of dynamic middleware that can be added, removed, and customized. There are three types of syncs, `BlockSync`, `EventSync`, and `TransactionSync` which each can trigger actions upon receiving updates to a new block, new event, or new transaction.

All three inherit from `BaseSync` which defines a set of `actions` to dispatch if the `filter` predicate matches the update. Sync middleware can be useful when looking to dispatch your own custom Redux action as a result of some blockchain update. They are also used as the building blocks for the Contract Call sync.

<b>Block Sync</b>

This middleware listens for `Block/CREATE` actions, and if a block matches its `filter` predicate, will dispatch its `actions`. The following example triggers every 5 blocks:

```typescript
store.dispatch(Sync.create({ id: '1', type: 'Block', filter: (block) => block.number % 5 == 0, actions }));
```

<b>Event Sync</b>

This middleware listens for `ContractEvent/CREATE` actions, and if an event matches its `filter` predicate, will dispatch its `actions`. The following example filters for events named `Transfer`:

```typescript
store.dispatch(Sync.create({ id: '1', type: 'Event', filter: (event) => event.name == 'Transfer', actions }));
```

<b>Transaction Sync</b>

This middleware listens for `Transaction/CREATE` actions, and if an event matches its `filter` predicate, will dispatch its `actions`. The following example filters for tranaction from a particular sender:

```typescript
store.dispatch(Sync.create({ id: '1', type: 'Transaction', filter: (tx) => tx.from == address, actions }));
```
