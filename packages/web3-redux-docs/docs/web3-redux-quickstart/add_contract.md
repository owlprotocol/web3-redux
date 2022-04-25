---
sidebar_position: 3
label: 'Configure Contract'
---

# Configure Contract

## Contract

The [Contract](../web3-redux-reference/interfaces/Contract.Contract-1.md) entity is the most used model in Web3-Redux. In Web3-Redux, a contract can be one of:

-   **Externally Owned Account (EOA)**: This is a simple Ethereum address that can have some balance, send transactions but does not have any code. Can be used to track Ethereum balance of some address for example.
-   **Smart Contract**: This is a program on the blockchain that stores and executes EVM bytecode. Can be used to track ERC20 token (eg. USDC) balance of some address for example.

Both are stored in the same `Contract` model as they are indexed by `networkId-address` in the store.

:::note
We do not use the sole address alone for indexing as a EOA or Smart Contract can exist on multiple EVM blockchains with a distinct balance/state.
:::

## Add Contract

Contracts can be used in multiple ways, such as fetching native token balance (ETH), making smart contract calls or listening for event logs. Once you've added a network (as in the previous section), add a contract by dispatching a `Contract.create` action with the following parameters:

-   `networkId` **(required)**: The network this contract lives on. Important to configure how data will be fetched.
-   `address` **(required)**: The address of this contract.
-   `abi`: **REQUIRED** for Smart Contracts to define their interface. EOAs do **NOT** have an abi.

Below we've extended the example from the previous section.

```tsx
//App.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import { Network } from '@owlprotocol/web3-redux';

import MyContract from '../artifacts/MyContract.json'; //Contract Truffle/Hardhat Artifact
const address = process.env.REACT_APP_MY_CONTRACT_ADDRESS; //Contract address

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Network.create({ networkId: '1' }));
        dispatch(
            Contract.create({
                networkId: '1',
                address,
                abi: MyContract.abi,
            }),
        );
    }, []); //Runs once on app mount
    //...
};
```
