import invariant from 'tiny-invariant';
import { isAddress } from '../utils/web3-utils/index.js';

export function isAddressGuard(address: string) {
    invariant(isAddress(address), `${address} is not address!`);
}

export default isAddressGuard;
