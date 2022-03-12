import { AbiCoder } from 'web3-eth-abi';

import { toWei } from '../utils/web3-utils/index.js';
import { cloneDeep } from '../utils/lodash/index.js';
import { REDUX_ROOT } from '../common.js';
import { StateRoot } from '../state.js';
import { getOrm } from '../orm.js';
import { validateBlock } from '../block/index.js';
import { validateContract } from '../contract/index.js';
import { validateContractEvent } from '../contractevent/index.js';
import { validateEthCall } from '../ethcall/index.js';
import { validateTransaction } from '../transaction/index.js';
import { BlockNumber, IERC20 } from '../abis/index.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
//const MockHTTP = require('mockttp');

export const networkId = '1336';

//Addresses
export const addressList = [
    '0x0000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000002',
    '0x0000000000000000000000000000000000000003',
    '0x0000000000000000000000000000000000000004',
    '0x0000000000000000000000000000000000000005',
    '0x0000000000000000000000000000000000000006',
    '0x0000000000000000000000000000000000000007',
    '0x0000000000000000000000000000000000000008',
    '0x0000000000000000000000000000000000000009',
];
export const ADDRESS_0 = addressList[0];
export const ADDRESS_1 = addressList[1];
export const ADDRESS_2 = addressList[2];
export const ADDRESS_3 = addressList[3];
export const ADDRESS_4 = addressList[4];
export const ADDRESS_5 = addressList[5];
export const ADDRESS_6 = addressList[6];
export const ADDRESS_7 = addressList[7];
export const ADDRESS_8 = addressList[8];
export const ADDRESS_9 = addressList[9];

//Popular addresses
export const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const VITALIK = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';

//Network
export const network1 = { networkId };

//Contract
export const contract0 = validateContract({
    networkId,
    address: ADDRESS_0,
    abi: cloneDeep(BlockNumber.abi) as any,
});

//Used in tests
export const contract1 = validateContract({
    networkId,
    address: ADDRESS_1,
    abi: cloneDeep(BlockNumber.abi) as any,
});
export const contract2 = validateContract({
    networkId,
    address: ADDRESS_2,
    balance: toWei('1'),
    nonce: 1,
});
export const contractWETH = validateContract({
    networkId: '1',
    address: WETH,
    abi: cloneDeep(IERC20.abi) as any,
});
export const contractVITALIK = validateContract({
    networkId: '1',
    address: VITALIK,
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
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const coder: AbiCoder = require('web3-eth-abi');
const method = 'getValue';
const methodAbi = (cloneDeep(BlockNumber.abi) as any).filter((f: any) => f.name === method)[0];
const data = coder.encodeFunctionCall(methodAbi, []);
export const ethCall1 = validateEthCall({ networkId, from: ADDRESS_0, to: ADDRESS_1, data, returnValue: 66 });

//State
const state: StateRoot = {
    [REDUX_ROOT]: getOrm().getEmptyState(),
};

state[REDUX_ROOT]['Network'].items.push(network1.networkId);
state[REDUX_ROOT]['Network'].itemsById[network1.networkId] = network1;

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
