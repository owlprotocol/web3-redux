---
sidebar_position: 4
label: 'Contract Call Sync'
---

# Contract Call Sync

Web3-Redux offers enhanced customizability of contract call syncing to avoid unecessary RPC calls. Contract call syncing is achieved by refreshing contract calls based on a set of parameters.

## Simple Contract Call

TODO

```tsx

```

## Generic Sync

This type union of [Sync](../web3-redux-reference/namespaces/Sync.md#sync) and other defaults is often used as a parameter in certain hooks such as [useContractCall](../web3-redux-hooks/Contract_Data.md#usecontractcall).

-   Sync: Regular Sync middleware action.
-   `"Block"`: Sync every block. Represents a [BlockSync](../web3-redux-reference/interfaces/Sync.BlockSync.md) with `matchBlockNumberModulo = 1`.
-   `number`: Sync every `n` blocks. Represents a [BlockSync](../web3-redux-reference/interfaces/Sync.BlockSync.md) with `matchBlockNumberModulo = n`.
-   `"Transaction"`: Sync every transaction from `sender`. `sender` is often another parameter in the function.
-   `"once"`: Don't sync. Fetch once and never refresh call.
-   `"ifnull"`: Fetch iff value in store is undefined.

**Reference:** [GenericSync](../web3-redux-reference/namespaces/Sync.md#genericsync)
`

In summary, there are 4 types of contract call sync types:

-   `once`: Call contract method once
-   `Block`: Call contract and refresh every block.
    `Event`: Call contract on an event.
-   `Transaction`: Call contract and refresh every time a block includes a transaction to the contract. This uses the heuristic that your contract's state only changes when transactions interact with it directly.

:::note
Both block sync and transaction sync require an existing block subscription to be first created.
:::

:::warning
`Transaction` sync's default behaviour might not be correct for your smart contract as state could be modified indirectly by the means of one smart contract calling another. See below for more info
:::

## Optimizing Call Sync

By default, contracts use Transaction syncing. It can however be customized for each specific contract call. This is can be a sub-optimal or even incorrect sync strategy.

Transaction syncing can be sub-optimal if a call's return value never changes. For example, an ERC20 token's name or symbol. In this case simply disable syncing with `sync: false`.

Transaction syncing assumes that the contract call values are only dependent on your contract's state and that this state is only changed by direct transactions to your contract. The basic logic for Transaction syncing is as follows: For each transaction in a new block, update contract call if `tx.to == contract.address`.
Examples of cases where this assumption might be incorrect include:

-   Contract call return value depends on block number
-   Contract state can be changed by a call to some proxy contract

In these cases we recommend switching to Block syncing, which will poll the contract call at every block. For even better optimization, it could be beneficial to use a custom block or transaction sync.

## Custom Call Syncs

:::tip
We recommend using Event Sync when possible as it is often the most optimal solution – only updating when the relevant state is modified.
:::

### Custom Block Sync

This might be useful as a quick solution to implement polling behaviour to the way you refresh a smart contract's data. This solution is especially optimal for state that depends on the block number (eg. some beacon).

```typescript
//Sync every 10 blocks
Sync.create({ id: '1', type: 'Block', matchBlockNumberModulo: 10, actions });
```

### Custom Transaction Sync

This might be useful when you know that only a set of `tx.to` addresses can initiate modifying the state of the smart contract.

```typescript
Sync.create({ id: '1', type: 'Transaction', matchTo: [contractAddress, proxyAddress], actions }));
```

### Custom Event Sync

This is often the most optimal solution when you are aware of the contract's logic and how events are emitted when state is updated. As an example, the `useERC20` hook, only refreshes `balanceOf` calls when relevant `Transfer` events are emitted.

```typescript
Sync.create({
    id: '1',
    type: 'Event',
    matchAddress: contractAddress,
    matchName: 'Transfer',
    matchReturnValues: [{ from: account }, { to: account }],
    actions,
});
```
