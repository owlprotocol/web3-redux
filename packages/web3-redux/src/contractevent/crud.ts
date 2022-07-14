import { name } from './common.js';
import { ContractEventId, ContractEvent, validateId, validate, ContractEventIndexInput } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractEventCRUD = createCRUDModel<
    'ContractEvent',
    ContractEventId,
    ContractEvent,
    ContractEvent,
    ContractEventIndexInput
>(name, validateId, validate);
export default ContractEventCRUD;
