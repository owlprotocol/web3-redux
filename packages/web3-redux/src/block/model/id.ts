/** Id components for Block */
interface BlockId {
    /** Blockchain network id. See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block number */
    readonly number: number;
}

export type { BlockId };
