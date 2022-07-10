import Web3 from 'web3';
import { NetworkWithObjects, validate } from './model/index.js';
import getWeb3Provider from '../test/getWeb3Provider.js';

export const network1337: NetworkWithObjects = validate({
    networkId: '1337',
    web3: new Web3(getWeb3Provider() as any),
} as NetworkWithObjects);
