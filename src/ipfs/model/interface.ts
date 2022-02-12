import { PBNode, PBLink } from '@ipld/dag-pb';
export interface IpfsId {
    /** ipfs hash */
    readonly contentId: string;
}

export interface Ipfs extends IpfsId {
    /** Protocol Buffer Node.
     * See https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-pb.md */
    readonly pbNode?: Partial<PBNode>;
    /** Links by Name */
    readonly linksByName?: { [k: string]: Partial<PBLink> };
    /** Decoded data */
    readonly data?: any;
}

export default Ipfs;
