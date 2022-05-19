import { coder } from '../utils/web3-eth-abi/index.js';
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
import { BlockNumber, IERC20, IERC721 } from '../abis/index.js';

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

//Popular tokens
export const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
export const TETHER = '0xdac17f958d2ee523a2206206994597c13d831ec7';
export const CHAINLINK = '0x514910771af9ca656af840dff83e8264ecf986ca';
//Popular nfts
export const VEE_FRIENDS_SERIES2 = '0x9378368ba6b85c1FbA5b131b530f5F5bEdf21A18';
//Popular addresses
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

//Token Contracts
export const contractWETH = validateContract({
    networkId: '1',
    address: WETH,
    abi: cloneDeep(IERC20.abi) as any,
});
export const contractUSDC = validateContract({
    networkId: '1',
    address: USDC,
    abi: cloneDeep(IERC20.abi) as any,
});
export const contractTETHER = validateContract({
    networkId: '1',
    address: TETHER,
    abi: cloneDeep(IERC20.abi) as any,
});
export const contractCHAINLINK = validateContract({
    networkId: '1',
    address: CHAINLINK,
    abi: cloneDeep(IERC20.abi) as any,
});

//Popular NFTs
export const contractVeeFriendsSeries2 = validateContract({
    networkId: '1',
    address: VEE_FRIENDS_SERIES2,
    abi: cloneDeep(IERC721.abi) as any,
});

//Popular Addresses
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
