import React from 'react';
import { Provider } from 'react-redux';
import { store, Abi, Block, Contract, EthCall, Network, Transaction } from '@owlprotocol/web3-redux';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    Provider,
    store,
    Abi, Block, Contract, EthCall, Network, Transaction
};
export default ReactLiveScope;
