import { coder } from '../utils/web3-eth-abi/index.js';
import { toWei } from '../utils/web3-utils/index.js';
import { cloneDeep } from '../utils/lodash/index.js';
import { REDUX_ROOT } from '../common.js';
import { StateRoot } from '../state.js';
import { getOrm } from '../orm.js';
import { BlockNumber } from '../abis/index.js';
import ContractCRUD from '../contract/crud.js';
import ContractEventCRUD from '../contractevent/crud.js';
import BlockCRUD from '../block/crud.js';
import TransactionCRUD from '../transaction/crud.js';
import EthCallCRUD from '../ethcall/crud.js';
import { toReduxOrmId } from '../createCRUDModel.js';

import IERC20 from '../artifacts/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol/IERC20Metadata.json';
import IERC721 from '../artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json';
import IERC1155 from '../artifacts/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol/IERC1155MetadataURI.json';

export const networkId = '1336';

//IPFS
export const QM_BAYC_PNG = 'QmNwbd7ctEhGpVkP8nZvBBQfiNeFKRdxftJAxxEdkUKLcQ';
export const QM_SQUARE_BLUE_PNG = 'QmcQNviCJWugAkrijvs1KFsabEXtrVQULGoXKy2PZBa5or';
export const QM_SQUARE_BLUE_SVG = 'QmNkp2s46DAeNMNdFYftfwtk1jH8jr5mSbJT65zgxF16ev';
export const QM_SQUARE_BLUE_JPG = 'QmUPQig42Rfo3q94EwbTM9fWLrovCErYgXBdsVGvwXQXuZ';
export const QM_SQUARE_BLUE_PDF = 'Qmd87rQWcGTHExKZQ7Zkh58BTWMeYwU98Bhkrz3iseTftd';
export const QM_SQUARE_GIF = 'QmPxoHKChAe44y3PkeyZxaVYUixPwywUCyAV3qYzfk43vt';
export const QM_HELLO_JSON = 'QmZfZGkfiJfkvM2tc7YbmeFRDaSwTPCfGe6E3xYPAjBnUe';

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
//ERC721
export const VEE_FRIENDS_SERIES2 = '0x9378368ba6b85c1FbA5b131b530f5F5bEdf21A18';
export const OZ_TEAM = '0x67ed2e5dd3d01ca342db045037be054dc6d8482a';
//ERC1155
export const KITH_FRIENDS = '0x130cfab3817467f532c179d4e6502f5a7e7d44c7'; //metadata has no CORS
export const SKYWEAVER = '0x631998e91476da5b870d741192fc5cbc55f5a52e';
//Popular addresses
export const VITALIK = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';

//Network
export const network1 = { networkId };

//Contract
export const contract0 = ContractCRUD.validate({
    networkId,
    address: ADDRESS_0,
    abi: cloneDeep(BlockNumber.abi) as any,
});

//Used in tests
export const contract1 = ContractCRUD.validate({
    networkId,
    address: ADDRESS_1,
    abi: cloneDeep(BlockNumber.abi) as any,
});
export const contract2 = ContractCRUD.validate({
    networkId,
    address: ADDRESS_2,
    balance: toWei('1'),
    nonce: 1,
});

//Implementation Contracts
export const contractERC20Implementation = ContractCRUD.validate({
    networkId: '1',
    address: ADDRESS_3,
    abi: cloneDeep(IERC20.abi) as any,
    tags: ['ERC20Implementation'],
    label: 'ERC20Implementation',
});
export const contractERC721Implementation = ContractCRUD.validate({
    networkId: '1',
    address: ADDRESS_4,
    abi: cloneDeep(IERC721.abi) as any,
    label: 'ERC721Implementation',
});

//Token Contracts
export const contractWETH = ContractCRUD.validate({
    networkId: '1',
    address: WETH,
    abi: cloneDeep(IERC20.abi) as any,
    tags: ['ERC20'],
    label: 'WETH',
});
export const contractUSDC = ContractCRUD.validate({
    networkId: '1',
    address: USDC,
    abi: cloneDeep(IERC20.abi) as any,
    tags: ['Favorites', 'ERC20'],
    label: 'USDC',
});
export const contractTETHER = ContractCRUD.validate({
    networkId: '1',
    address: TETHER,
    abi: cloneDeep(IERC20.abi) as any,
    tags: ['ERC20'],
    label: 'TETHER',
});
export const contractCHAINLINK = ContractCRUD.validate({
    networkId: '1',
    address: CHAINLINK,
    abi: cloneDeep(IERC20.abi) as any,
    tags: ['ERC20'],
    label: 'LINK',
});

//ERC721
export const contractVeeFriendsSeries2 = ContractCRUD.validate({
    networkId: '1',
    address: VEE_FRIENDS_SERIES2,
    abi: cloneDeep(IERC721.abi) as any,
    tags: ['ERC721'],
    label: 'Vee Friends 2',
});
export const contractOZTeam = ContractCRUD.validate({
    networkId: '1',
    address: OZ_TEAM,
    abi: cloneDeep(IERC721.abi) as any,
    tags: ['ERC721'],
    label: 'OZ Team NFT',
});

//ERC1155
export const contractKithFriends = ContractCRUD.validate({
    networkId: '1',
    address: KITH_FRIENDS,
    abi: cloneDeep(IERC1155.abi) as any,
    tags: ['ERC1155'],
    label: 'Kith Friends',
});
export const contractSkyWeaver = ContractCRUD.validate({
    networkId: '137',
    address: SKYWEAVER,
    abi: cloneDeep(IERC1155.abi) as any,
    tags: ['ERC1155'],
    label: 'Sky Weaver',
});

//Popular Addresses
export const contractVITALIK = ContractCRUD.validate({
    networkId: '1',
    address: VITALIK,
    tags: [],
    label: 'Vitalik Buterin',
});

export const contract1Id = { networkId, address: ADDRESS_1 };

//ContractEvent
export const event1 = ContractEventCRUD.validate({
    networkId,
    address: ADDRESS_1,
    name: 'NewValue',
    blockHash: '0x0',
    logIndex: 0,
    returnValues: { val: 42 },
});

export const event2 = ContractEventCRUD.validate({
    networkId,
    address: ADDRESS_1,
    name: 'NewValue',
    blockHash: '0x0',
    logIndex: 1,
    returnValues: { val: 42, val2: 69 },
});

//Block
export const block1 = BlockCRUD.validate({ networkId, number: 1 });
export const block2 = BlockCRUD.validate({ networkId, number: 2 });
//Transaction
export const transaction1 = TransactionCRUD.validate({
    networkId,
    hash: '0x0',
    blockNumber: 1,
    from: ADDRESS_1,
    to: ADDRESS_0,
});
export const transaction2 = TransactionCRUD.validate({
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
export const ethCall1 = EthCallCRUD.validate({ networkId, from: ADDRESS_0, to: ADDRESS_1, data, returnValue: 66 });

//State
const state: StateRoot = {
    [REDUX_ROOT]: getOrm().getEmptyState(),
};

state[REDUX_ROOT]['Network'].items.push(network1.networkId);
state[REDUX_ROOT]['Network'].itemsById[network1.networkId] = network1;

state[REDUX_ROOT]['Contract'].items.push(toReduxOrmId(ContractCRUD.validateId(contract1)));
state[REDUX_ROOT]['Contract'].itemsById[toReduxOrmId(ContractCRUD.validateId(contract1))] = contract1;

export { state };
