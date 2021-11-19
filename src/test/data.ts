import BlockNumber from '../abis/BlockNumber.json';

import { validateContract } from '../contract';
import { validateContractEvent } from '../contractevent';

export const networkId = '1337';
export const ADDRESS_1 = '0x0000000000000000000000000000000000000001';
export const ADDRESS_2 = '0x0000000000000000000000000000000000000002';

//Network
export const network1 = { networkId };

//Contract
export const contract1 = validateContract({
    networkId,
    address: ADDRESS_1,
    abi: BlockNumber.abi as any,
});

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
