import { name } from './common.js';
import { EthCallId, EthCall, validateId, validate, EthCallIndexInput } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const EthCallCRUD = createCRUDModel<typeof name, EthCallId, EthCall, EthCall, EthCallIndexInput>(
    name,
    validateId,
    validate,
);
export default EthCallCRUD;
