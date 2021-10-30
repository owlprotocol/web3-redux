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
export default interface Interface extends IdDeconstructed {
    readonly id: Id;
    readonly balance?: string;
    readonly nonce?: number;
}

export interface InterfacePartialWithId extends Partial<Interface> {
    id: Id;
}

export interface InterfacePartialWithIdDeconstructed extends Partial<Interface> {
    readonly networkId: IdDeconstructed['networkId'];
    readonly address: IdDeconstructed['address'];
}
export type InterfacePartial = InterfacePartialWithId | InterfacePartialWithIdDeconstructed;
export function isPartialWithId(x: InterfacePartial): x is InterfacePartialWithId {
    return !!x.id;
}
export function isPartialWithIdDeconstructed(x: InterfacePartial): x is InterfacePartialWithIdDeconstructed {
    return !x.id;
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

export function validate(item: InterfacePartial): Interface {
    if (isPartialWithIdDeconstructed(item)) {
        const id = getId({ ...(item as InterfacePartialWithIdDeconstructed) });
        return {
            ...item,
            id,
        };
    } else {
        const { networkId, address } = getIdDeconstructed(item.id);
        return {
            ...item,
            networkId,
            address,
        };
    }
}
