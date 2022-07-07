import { name } from './common.js';
import { _4ByteSignature, _4ByteSignatureId, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const _4ByteCRUD = createCRUDModel<_4ByteSignature, _4ByteSignatureId, '4Byte'>(name, validateId, validate);
export default _4ByteCRUD;
