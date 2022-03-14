import invariant from 'tiny-invariant';
import { isCID } from './isCID.js';

export function isCIDGuard(hash: string) {
    invariant(isCID(hash), `${hash} is not CID!`);
}

export default isCIDGuard;
