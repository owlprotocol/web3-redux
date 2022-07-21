import { name } from './common.js';
import { _4ByteSignature, _4ByteSignatureId } from './model/index.js';
import createCRUDModel from '../crud/createCRUDModel.js';

export const _4ByteCRUD = createCRUDModel<
    typeof name,
    _4ByteSignatureId,
    _4ByteSignature,
    _4ByteSignature,
    _4ByteSignature
>(name);
export default _4ByteCRUD;
