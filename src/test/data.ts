import BlockNumber from '../abis/BlockNumber.json';

import { validateContract } from '../contract';
import { validateContractEvent } from '../contractevent';
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

//Transaction
export const transaction1 = validateTransaction({ networkId, hash: '0x0', from: ADDRESS_1, to: ADDRESS_0 });
export const transaction2 = validateTransaction({ networkId, hash: '0x1', from: ADDRESS_0, to: ADDRESS_1 });
