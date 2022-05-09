//ESM Shim
import Web3 from 'web3';
import type { AbiItem } from 'web3-utils';

export const { toChecksumAddress, toWei, keccak256, isHexStrict, isAddress, hexToNumberString } = Web3.utils;
export type { AbiItem };
