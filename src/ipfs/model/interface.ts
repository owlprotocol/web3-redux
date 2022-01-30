import { ModelWithId } from '../../types/model';

export interface IpfsId {
    /** ipfs hash */
    readonly contentId: string;
}

export interface Ipfs extends IpfsId {
    /** Used to index in redux-orm. Computed as `${contentId}` */
    readonly id?: string;
    /** ipfs url */
    readonly ipfsUrl?: string;
    /** data blob */
    readonly data?: Uint8Array;
}

const SEPERATOR = '-';
/** @internal */
export function getId(id: IpfsId): string {
    const { contentId } = id;
    return contentId;
}

/** @internal */
export function getIdDeconstructed(id: string): IpfsId {
    const [contentId] = id.split(SEPERATOR);
    return { contentId };
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
