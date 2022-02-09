export interface SignatureId {
    /** The keccak-256 hash of the event or function signature */
    readonly signatureHash: string;
}

export interface _4ByteSignature extends SignatureId {
    /** Event Name */
    readonly name?: string;
    /** Event Args */
    readonly args?: string[];
}

export default _4ByteSignature;
