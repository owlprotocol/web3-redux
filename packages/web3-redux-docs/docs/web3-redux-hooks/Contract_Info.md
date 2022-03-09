---
sidebar_position: 3.1
---

# Contract - Info

These hooks are used to get general info about an address and can be used for any address, meaning **BOTH** Externally Owned Accounts (EOA) and smart contracts.

## useGetBalance

Get balance of address. Uses [Web3.eth.getBalance](https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#getbalance)

```tsx
const balance = Contract.useGetBalance(networkId, address);
```

**Reference:** [Contract.useGetBalance](../web3-redux-reference/namespaces/Contract.md#usegetbalance)

## useGetNonce

Get nonce (tx count) of address. Uses [Web3.eth.getTransactionCount](https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#gettransactioncount)

```tsx
const nonce = Contract.useGetNonce(networkId, address);
```

**Reference:** [Contract.useGetNonce](../web3-redux-reference/namespaces/Contract.md#usegetnonce)

## useGetCode

Get code at address. `0x` indicates an EOA. Uses [Web3.eth.getCode](https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#getcode)

```tsx
const code = Contract.useGetCode(networkId, address);
```

:::tip
Use the `useGetCode` hook to determine if an address is an EOA or smart contract.
:::
