import { name } from './common.js';
import { _4ByteSignature, _4ByteSignatureId, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const _4ByteCRUD = createCRUDModel<'4Byte', _4ByteSignatureId, _4ByteSignature>(name, validateId, validate);
export default _4ByteCRUD;
