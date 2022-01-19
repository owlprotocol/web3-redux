import { toChecksumAddress } from 'web3-utils';
import { ModelWithId } from '../../types/model';

/** Ethereum Account id components. */
export interface AccountId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Ethereum checksum address */
    readonly address: string;
}

/**
 * Ethereum Account. Store balance, nonce.
 */
export interface Account extends AccountId {
    /** Used to index in redux-orm. Computed as `${networkId}-${address}` */
    readonly id?: string;
    /** Account balance in wei */
    readonly balance?: string;
    /** Account nonce aka number of transactions sent. */
    readonly nonce?: number;
}

const SEPARATOR = '-';
/** @internal */
export function getId(id: AccountId): string {
    const { networkId, address } = id;
    return [networkId, toChecksumAddress(address)].join(SEPARATOR);
}
/** @internal */
export function getIdDeconstructed(id: string): AccountId {
    const [networkId, address] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, address: toChecksumAddress(address) };
}

/** @internal */
export function validate(item: Account): ModelWithId<Account> {
    const id = getId(item);
    return {
        ...item,
        id,
        address: toChecksumAddress(item.address),
    };
}

export default Account;
