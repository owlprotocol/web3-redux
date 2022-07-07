import { name } from './common.js';
import { ContractEventId, ContractEvent, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractEventCRUD = createCRUDModel<ContractEventId, ContractEvent, 'ContractEvent'>(
    name,
    validateId,
    validate,
);
export default ContractEventCRUD;
