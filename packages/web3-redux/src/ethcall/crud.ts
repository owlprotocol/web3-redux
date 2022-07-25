import { name } from './common.js';
import { EthCallId, EthCall, validateId, validate, EthCallIndexInput, toPrimaryKey } from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const EthCallCRUD = createCRUDModel<typeof name, EthCallId, EthCall, EthCall, EthCallIndexInput>(name, {
    validateId,
    validate,
    toPrimaryKey,
});
export default EthCallCRUD;
