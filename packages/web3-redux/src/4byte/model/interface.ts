export interface _4ByteSignatureId {
    /** keccak256 hash event signature or 4byte function signature */
    readonly signatureHash: string;
}

export interface _4ByteSignature extends _4ByteSignatureId {
    /** Pre-image */
    readonly preImage?: string;
    /** Signature type */
    readonly signatureType?: 'Event' | 'Function';
}

export const _4ByteIndex = 'signatureHash';

/** @internal */
export function validateId(item: _4ByteSignatureId) {
    return item.signatureHash;
}

/** @internal */
export function validate(item: _4ByteSignature): _4ByteSignature {
    return item;
}

export default _4ByteSignature;
