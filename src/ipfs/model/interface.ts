import { ModelWithId } from '../../types/model';

export interface IpfsId {
    /** networkId */
    readonly networkId: string;
    /** ipfs hash */
    readonly contentId: string;
}

export interface Ipfs extends IpfsId {
    /** Used to index in redux-orm. Computed as `${networkId}-${contentId}` */
    readonly id?: string;
    /** data blob */
    readonly data?: Uint8Array;
}

const SEPERATOR = '-';
/** @internal */
export function getId(id: IpfsId): string {
    const { networkId, contentId } = id;
    return [networkId, contentId].join(SEPERATOR);
}

/** @internal */
export function getIdDeconstructed(id: string): IpfsId {
    const [networkId, contentId] = id.split(SEPERATOR);
    return { networkId, contentId };
}

/** @internal */
export function validate(item: Ipfs): ModelWithId<Ipfs> {
    const id = getId(item);
    return {
        ...item,
        id,
        contentId: item.contentId,
    };
}

export default Ipfs;
