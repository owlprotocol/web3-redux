/** @internal */
export interface IdDeconstructed {
    /** Blockchain network id. See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block number */
    readonly number: number;
}
/** @internal */
export type Id = string;

/** @internal */
export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
/** @internal */
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;
    const { networkId, number } = id;

    return [networkId, number].join(SEPARATOR);
}
/** @internal */
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, number] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, number: parseInt(number) };
}
