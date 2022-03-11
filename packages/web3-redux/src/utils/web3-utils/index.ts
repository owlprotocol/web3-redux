//ESM Shim
import Web3Utils, { AbiItem } from 'web3-utils';

export const { toChecksumAddress, keccak256, isHexStrict, isAddress, hexToNumberString } = Web3Utils;
export type { AbiItem };
