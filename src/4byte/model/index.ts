import { _4ByteSignature, SignatureId, validate, getId, getIdDeconstructed } from './interface';

export type { _4ByteSignature, SignatureId };
export { getId, getIdDeconstructed, validate };
export { getId as get4ByteSigId, validate as validateSignature };
