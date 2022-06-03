import { PBNode, PBLink } from '@ipld/dag-pb';
export interface IpfsId {
    /** ipfs hash */
    readonly contentId: string;
}

export enum IPFSDataType {
    Raw = 0,
    Directory = 1,
    File = 2,
    Metadata = 3,
    Symlink = 4,
    HAMTShard = 5,
    DAG_CBOR = 6,
}

export interface Ipfs extends IpfsId {
    /** Protocol Buffer Node.
     * See https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-pb.md */
    readonly pbNode?: Partial<PBNode>;
    /** Links by Name */
    readonly linksByName?: { [k: string]: Partial<PBLink> };
    /** Decoded data */
    readonly data?: any;
    /** Type of data */
    readonly type?: IPFSDataType;
}

export default Ipfs;
