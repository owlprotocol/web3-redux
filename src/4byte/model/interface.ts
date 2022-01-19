import { ModelWithId } from '../../types/model';

export interface SignatureId {
    readonly networkId: string;
    /** The keccak-256 hash of the event or function signature */
    readonly signatureHash: string;
}

export interface _4ByteSignature extends SignatureId {
    /** Used to index 4Byte signatures in redux-orm. Computed as `${networkId}-${signatureHash} */
    readonly id?: string;
    /** Event Name */
    readonly name?: string;
    /** Event Args */
    readonly args?: string[];
}

const SEPERATOR = '-';
/** @internal */

export function getId(id: SignatureId): string {
    const { networkId, signatureHash } = id;

    return [networkId, signatureHash].join(SEPERATOR);
}
/** @internal */
export function getIdDeconstructed(id: string): SignatureId {
    const [networkId, signatureHash] = id.split(SEPERATOR);
    return { networkId, signatureHash };
}

/** @internal */
export function validate(item: _4ByteSignature): ModelWithId<_4ByteSignature> {
    const id = getId(item);
    return {
        ...item,
        id,
    };
}

export default _4ByteSignature;
