export interface IpfsId {
    /** ipfs hash */
    readonly contentId: string;
}

export interface Ipfs extends IpfsId {
    /** data blob */
    readonly data?: Uint8Array;
    /** Url */
    readonly ipfsUrl?: string;
}

export default Ipfs;
