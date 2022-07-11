import Web3 from 'web3';
import { NetworkWithObjects, validate } from './model/index.js';
import getWeb3Provider from '../test/getWeb3Provider.js';
import { networkId } from '../data.js';

export const network1336: NetworkWithObjects = validate({
    networkId,
    web3: new Web3(getWeb3Provider() as any),
} as NetworkWithObjects);
