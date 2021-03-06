import { name } from './common.js';
import { ContractSendId, ContractSend, validateId, validate } from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const ContractSendCRUD = createCRUDModel<typeof name, ContractSendId, ContractSend, ContractSend, ContractSend>(
    name,
    {
        validateId,
        validate,
    },
);
export default ContractSendCRUD;
