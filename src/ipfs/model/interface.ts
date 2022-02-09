export interface IpfsId {
    /** ipfs hash */
    readonly contentId: string;
}

export interface Ipfs extends IpfsId {
    /** data blob */
    readonly data?: any;
}

export default Ipfs;
