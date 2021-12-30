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
    return [networkId, address].join(SEPARATOR);
}
/** @internal */
export function getIdDeconstructed(id: string): AccountId {
    const [networkId, address] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, address };
}

/** @internal */
export function validate(item: Account): Account {
    const id = getId(item);
    return {
        ...item,
        id,
    };
}

export default Account;
