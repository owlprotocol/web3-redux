import { validate } from './model/index.js';
import { ADDRESS_0, ADDRESS_1, networkId } from '../data.js';

//Transaction
export const transaction1 = validate({
    networkId,
    hash: '0x0',
    blockNumber: 1,
    from: ADDRESS_1,
    to: ADDRESS_0,
});
export const transaction2 = validate({
    networkId,
    hash: '0x1',
    blockNumber: 2,
    from: ADDRESS_0,
    to: ADDRESS_1,
});
