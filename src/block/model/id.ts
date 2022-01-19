/** Id components for Block */
export interface BlockId {
    /** Blockchain network id. See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block number */
    readonly number: number;
}

const SEPARATOR = '-';
/** @internal */
export function getId(id: BlockId): string {
    if (typeof id === 'string') return id;
    const { networkId, number } = id;

    return [networkId, number].join(SEPARATOR);
}
/** @internal */
export function getIdDeconstructed(id: string): BlockId {
    if (typeof id !== 'string') return id;

    const [networkId, number] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, number: parseInt(number) };
}
