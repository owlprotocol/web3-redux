export interface IpfsId {
    /** ipfs hash */
    readonly contentId: string;
}

export interface Ipfs extends IpfsId {
    /** data blob */
    readonly data?: Uint8Array;
}

export default Ipfs;
