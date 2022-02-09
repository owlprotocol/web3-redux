export interface SignatureId {
    /** keccak256 hash event signature or 4byte function signature */
    readonly signatureHash: string;
}

export interface _4ByteSignature extends SignatureId {
    /** Pre-image */
    readonly preImage?: string;
    /** Signature type */
    readonly signatureType?: 'Event' | 'Function';
}

export default _4ByteSignature;
