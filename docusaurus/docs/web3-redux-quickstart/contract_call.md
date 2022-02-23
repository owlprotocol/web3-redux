---
sidebar_position: 4
label: 'Contract Call'
---

# Contract Call

A contract call is read-only RPC request to fetch data from a smart contract. Fetching an ERC20 token balance with `balanceOf(address)` is a contract call for example.

Under the hood, Web3-Redux uses the [web3.eth.Contract.methods.myMethod.call](https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#methods-mymethod-call) API.

## React Hook

The easiest way make a contract is using the `useContractCall` hook. This combines dispatching a redux action and using a selector to return the updated result.

Here we use `once` as the sync parameter to instruct the hook to dispatch a single eth call. For more info on complex sync strategies, see the sync documentation [TBD](#)

```tsx
import { Contract } from '@leovigna/web3-redux';
const ERC20Component = ({ networkId, address, account }) => {
    //Make contract call
    const balanceOf = Contract.useContractCall(networkId, address, 'balanceOf', [account]);
    //...
};
```

## Plain Redux

Under the hood, the `useContractCall` hook is mainly composed by dispatching a `Contract.call` action and then using the `selectContractCall` selector to read the result from teh state.

```typescript
//Make contract call
store.dispatch(Contract.call({
    networkId,
    address,
    method: 'balanceOf',
    args: [account],
}));
const balance = Contract.selectContractCall(state, {networkId, address }, 'balanceOf', { args: [account] } ]})
```