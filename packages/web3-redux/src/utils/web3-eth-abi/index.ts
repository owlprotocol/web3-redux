import Web3 from 'web3';
import type { AbiCoder } from 'web3-eth-abi';

const web3 = new Web3();
const coder = web3.eth.abi as AbiCoder;

export { coder };
export type { AbiCoder };
