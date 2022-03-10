import { assert } from 'chai';
import Web3 from 'web3';
import { cloneDeep } from 'lodash';
import * as BlockNumberArtifact from './abis/BlockNumber.json';
import { ZERO_ADDRESS } from './utils/index.js';

describe('abi.test.ts', () => {
    it('web3.eth.Contract mutates abi', () => {
        const web3 = new Web3('http://localhost:8545');

        const abi = cloneDeep(BlockNumberArtifact.abi);
        const abiOrig = cloneDeep(abi);
        new web3.eth.Contract(abi as any, ZERO_ADDRESS);

        assert.notDeepEqual(abi, abiOrig, 'abi is equal!'); //Abi has been mutated by web3
    });
});
