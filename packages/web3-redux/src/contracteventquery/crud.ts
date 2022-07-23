import { name } from './common.js';
import {
    ContractEventQueryId,
    ContractEventQuery,
    validate,
    ContractEventIndexInput,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const ContractEventQueryCRUD = createCRUDModel<
    typeof name,
    ContractEventQueryId,
    ContractEventQuery,
    ContractEventQuery,
    ContractEventIndexInput
>(name, { validate, validateId, toPrimaryKey });
export default ContractEventQueryCRUD;
