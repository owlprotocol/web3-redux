---
sidebar_position: 4
label: 'Contract Call'
---

# Contract Call

A contract call is read-only RPC request to fetch data from a smart contract. Fetching an ERC20 token balance with `balanceOf(address)` is a contract call for example.

Under the hood, Web3-Redux uses the [web3.eth.Contract.methods.myMethod.call](https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#methods-mymethod-call) API.

## React Hook

The easiest way make a contract is using the `useContractCall` hook. This combines dispatching a redux [action](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#actions) and using a [selector](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#selectors) to return the updated result.

```tsx
import { Contract } from '@owlprotocol/web3-redux';
const ERC20Component = ({ networkId, address, account }) => {
    //Make contract call
    const balanceOf = Contract.useContractCall(networkId, address, 'balanceOf', [account]);
    //...
};
```

:::tip
Here our hook implicitly uses `"once"` as the default sync parameter to instruct the hook to dispatch a single eth call.
For more info on complex sync strategies, see the [Advanced/Contract Call Sync](..//web3-redux-advanced/sync_contract_call.md)
:::

## Plain Redux

Under the hood, the [useContractCall](../web3-redux-reference/namespaces/Contract.md#usecontractcall) hook is made by dispatching a [call](../web3-redux-reference/namespaces/Contract.md#call) action, then using the [selectContractCall](../web3-redux-reference/namespaces/Contract.md#selectcontractcall) selector to read the result from the state.

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
