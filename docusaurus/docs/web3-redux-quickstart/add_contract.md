---
sidebar_position: 3
label: 'Configure Contract'
---

# Configure Contract

## Contract

The Contract entity is the most used model in Web3-Redux. In Web3-Redux, a contract can be one of:

-   Externally Owned Account (EOA): This is a simple Ethereum address that can have some balance, send transactions but that does not have any code. Can be used to track Ethereum balance of some address for example.
-   Smart Contract: This is a program on the blockchain that stores and executes EVM bytecode. Can be used to track ERC20 token (eg. USDC) balance of some address for example.

Both a stored in the same `Contract` model as they are indexed by `networkId-address` in the store. Note how we do not use the sole address as a EOA or Smart Contract can exist on multiple EVM blockchains with distinct a balance/state.

Contracts can be used in multiple ways such as fetching native token balance (ETH), making smart contract calls, or listening for event logs. You must first configure a contract however by setting the following parameters:

-   `networkId` (required): The network this contract lives on. Important to configure how data will be fetched.
-   `address` (required): The address of this contract.
-   `abi` (optional): Required for Smart Contracts to define its interface. EOAs do **NOT** have an abi.

## Add Contract

One you've added a network, add a contract by dispatching a `Contract.create` action.
Below we've extended the previous example.

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
        const abi = dispatch(Contract.create({ networkId: '1', address, abi: MyContract.abi }));
    }, []); //Runs once on app mount
    //...
};
```
