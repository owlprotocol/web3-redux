import { name } from './common.js';
import { ContractSendId, ContractSend, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractSendCRUD = createCRUDModel<ContractSendId, ContractSend, 'ContractSend'>(
    name,
    validateId,
    validate,
);
export default ContractSendCRUD;
