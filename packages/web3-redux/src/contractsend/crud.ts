import { name } from './common.js';
import { ContractSendId, ContractSend, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractSendCRUD = createCRUDModel<'ContractSend', ContractSendId, ContractSend>(
    name,
    validateId,
    validate,
);
export default ContractSendCRUD;
