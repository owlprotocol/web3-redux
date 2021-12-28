/** @internal */
export interface AccountId {
    readonly networkId: string;
    readonly address: string;
}

/**
 * Ethereum Account. Store balance, nonce.
 *
 * @param id - Used to index in redux-orm. Computed as `${networkId}-${address}`.
 * @param address - Account address.
 * @param balance - Account balance in wei.
 * @param nonce - Account nonce.
 */
//Id args cannot be optional
export interface Account extends AccountId {
    readonly id?: string;
    readonly balance?: string;
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
