import { assert } from 'chai';
import Web3 from 'web3';
import { BlockNumberArtifact } from './abis/index.js';
import { ZERO_ADDRESS } from './utils/index.js';
import { cloneDeep } from './utils/lodash/index.js';

describe('abi.test.ts', () => {
    it('web3.eth.Contract mutates abi', () => {
        const web3 = new Web3('http://localhost:8545');

        const abi = cloneDeep(BlockNumberArtifact.abi);
        const abiOrig = cloneDeep(abi);
        new web3.eth.Contract(abi as any, ZERO_ADDRESS);

        assert.notDeepEqual(abi, abiOrig, 'abi is equal!'); //Abi has been mutated by web3
    });
});
