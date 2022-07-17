import { name } from './common.js';
import {
    ContractEventId,
    ContractEvent,
    validate,
    ContractEventIndexInput,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractEventCRUD = createCRUDModel<
    typeof name,
    ContractEventId,
    ContractEvent,
    ContractEvent,
    ContractEventIndexInput
>(name, { validate, validateId, toPrimaryKey });
export default ContractEventCRUD;
