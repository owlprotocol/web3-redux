import { AbiCoder } from 'web3-eth-abi';
import BlockNumber from '../abis/BlockNumber.json';
import { REDUX_ROOT } from '../common';

import { validateContract } from '../contract';
import { validateContractEvent } from '../contractevent';
import { validateEthCall } from '../ethcall';
import { getOrm } from '../orm';
import { StateRoot } from '../state';
import { validateBlock } from '../block';
import { validateTransaction } from '../transaction';

export const networkId = '1336';
export const addressList = [
    '0x0000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000002',
];
export const ADDRESS_0 = addressList[0];
export const ADDRESS_1 = addressList[1];
export const ADDRESS_2 = addressList[2];

//Network
export const network1 = { networkId };

//Contract
export const contract1 = validateContract({
    networkId,
    address: ADDRESS_1,
    abi: BlockNumber.abi as any,
});

export const contract1Id = { networkId, address: ADDRESS_1 };

//ContractEvent
export const event1 = validateContractEvent({
    networkId,
    address: ADDRESS_1,
    name: 'NewValue',
    blockHash: '0x0',
    logIndex: 0,
    returnValues: { val: 42 },
});

export const event2 = validateContractEvent({
    networkId,
    address: ADDRESS_1,
    name: 'NewValue',
    blockHash: '0x0',
    logIndex: 1,
    returnValues: { val: 42, val2: 69 },
});

//Block
export const block1 = validateBlock({ networkId, number: 1 });
export const block2 = validateBlock({ networkId, number: 2 });
//Transaction
export const transaction1 = validateTransaction({
    networkId,
    hash: '0x0',
    blockNumber: 1,
    from: ADDRESS_1,
    to: ADDRESS_0,
});
export const transaction2 = validateTransaction({
    networkId,
    hash: '0x1',
    blockNumber: 2,
    from: ADDRESS_0,
    to: ADDRESS_1,
});

//Ethcall
// eslint-disable-next-line @typescript-eslint/no-var-requires
const coder: AbiCoder = require('web3-eth-abi');
const method = 'getValue';
const methodAbi = (BlockNumber.abi as any).filter((f: any) => f.name === method)[0];
const data = coder.encodeFunctionCall(methodAbi, []);
export const ethCall1 = validateEthCall({ networkId, from: ADDRESS_0, to: ADDRESS_1, data, returnValue: 66 });

//State
const state: StateRoot = {
    [REDUX_ROOT]: getOrm().getEmptyState(),
};

state[REDUX_ROOT]['Contract'].items.push(contract1.id);
state[REDUX_ROOT]['Contract'].itemsById[contract1.id] = contract1;

//Set Eth Call
state[REDUX_ROOT]['EthCall'].items.push(ethCall1.id);
state[REDUX_ROOT]['EthCall'].itemsById[ethCall1.id!] = ethCall1;

//Set Event
state[REDUX_ROOT]['ContractEvent'].items.push(event1.id);
state[REDUX_ROOT]['ContractEvent'].itemsById[event1.id!] = event1;
state[REDUX_ROOT]['ContractEvent'].items.push(event2.id);
state[REDUX_ROOT]['ContractEvent'].itemsById[event2.id!] = event2;

//Set Transactions
state[REDUX_ROOT]['Transaction'].items.push(transaction1.id);
state[REDUX_ROOT]['Transaction'].itemsById[transaction1.id!] = transaction1;
state[REDUX_ROOT]['Transaction'].items.push(transaction2.id);
state[REDUX_ROOT]['Transaction'].itemsById[transaction2.id!] = transaction2;

state[REDUX_ROOT]['Transaction'].indexes.fromId[contract1.id] = [transaction1.id];
state[REDUX_ROOT]['Transaction'].indexes.toId[contract1.id] = [transaction2.id];

export { state };
