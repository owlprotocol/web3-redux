import BlockNumber from '../abis/BlockNumber.json';

import { validateContract } from '../contract';
import { validateContractEvent } from '../contractevent';

export const networkId = '1337';
export const ADDRESS_1 = '0x0000000000000000000000000000000000000001';
export const ADDRESS_2 = '0x0000000000000000000000000000000000000002';
export const addressList = [
    '0x0000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000002',
    '0x0000000000000000000000000000000000000003',
    '0x0000000000000000000000000000000000000004',
    '0x0000000000000000000000000000000000000005',
    '0x0000000000000000000000000000000000000006',
];

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
