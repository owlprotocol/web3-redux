---
sidebar_position: 4
---

# Block

These hooks are designed to fetch block data.

## useBlock

Fetch specific block by number or blockHash.

```tsx
const block = Block.useBlock(networkId, 0);
```

**Reference:** [Block.useBlock](../web3-redux-reference/namespaces/Block.md#useblock)

## useLatestBlock

Fetch latest block for network.

```tsx
const block = Block.useLatestBlock(networkId);
```

**Reference:** [Block.useLatestBlock](../web3-redux-reference/namespaces/Block.md#uselatestblock)

## useBlockSync

Subscribe to new blocks and return all current blocks for network in store.

```tsx
const blocks = Block.useBlockSync(networkId);
```

**Reference:** [Block.useBlockSync](../web3-redux-reference/namespaces/Block.md#useblocksync)

:::caution
While some features of Web3-Redux might work with an HTTP (`http://`) connection, subscriptions **REQUIRE** a network configured with a websocket (`ws://`) connection.
:::
