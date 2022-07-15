import { name } from './common.js';
import {
    ContractEventQueryId,
    ContractEventQuery,
    validate,
    ContractEventIndexInput,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractEventCRUD = createCRUDModel<
    typeof name,
    ContractEventQueryId,
    ContractEventQuery,
    ContractEventQuery,
    ContractEventIndexInput
>(name, { validate, validateId, toPrimaryKey });
export default ContractEventCRUD;
