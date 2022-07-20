import React from 'react';
//import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
//import { Provider } from 'react-redux';
//import { store, Abi, Block, Contract, EthCall, Network, Transaction } from '@owlprotocol/web3-redux'

let ReactLiveScope = {
    React,
    ...React,
    //  Provider,
    //  store, Abi, Block, Contract, EthCall, Network, Transaction
};

/*
if (ExecutionEnvironment.canUseDOM) {
    const Web3Redux = await import('@owlprotocol/web3-redux');
    const { store, Abi, Block, Contract, EthCall, Network, Transaction } = Web3Redux;
    ReactLiveScope = {
        ...ReactLiveScope,
        store,
        Abi, Block, Contract, EthCall, Network, Transaction
    }
}
*/

export default ReactLiveScope;
