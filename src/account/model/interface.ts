export interface IdDeconstructed {
    readonly networkId: string;
    readonly address: string;
}
export type Id = string;

/**
 * Ethereum Account. Store balance, nonce.
 *
 * @param id - Used to index in redux-orm. Computed as `${networkId}-${address}`.
 * @param address - Account address.
 * @param balance - Account balance.
 * @param nonce - Account nonce.
 */
//Id args cannot be optional
export interface Interface extends IdDeconstructed {
    readonly id?: Id;
    readonly balance?: string;
    readonly nonce?: number;
}

export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;
    const { networkId, address } = id;

    return [networkId, address].join(SEPARATOR);
}
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, address] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, address };
}

export function validate(item: Interface): Interface {
    const id = getId(item);
    return {
        ...item,
        id,
    };
}

export default Interface;
