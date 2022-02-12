import invariant from 'tiny-invariant';
import { isAddress } from 'web3-utils';

export function isAddressGuard(address: string) {
    invariant(isAddress(address), `${address} is not address!`);
}

export default isAddressGuard;
