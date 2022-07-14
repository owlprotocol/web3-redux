import type { AbiItem } from 'web3-utils';
import EthCallCRUD from './crud.js';
import { coder } from '../utils/web3-eth-abi/index.js';
import { BlockNumberArtifact } from '../abis/index.js';
import { networkId, ADDRESS_1, ADDRESS_2 } from '../data.js';

//Ethcall
const methodName = 'getValue';
const methodAbi = (BlockNumberArtifact.abi as AbiItem[]).filter((f: any) => f.name === methodName)[0];
const data = coder.encodeFunctionCall(methodAbi, []);
export const ethCall1 = EthCallCRUD.validate({
    networkId,
    to: ADDRESS_1,
    data,
    methodName,
    returnValue: 66,
});

export const ethCall2 = EthCallCRUD.validate({
    networkId,
    to: ADDRESS_2,
    data,
    methodName,
    returnValue: 66,
});
