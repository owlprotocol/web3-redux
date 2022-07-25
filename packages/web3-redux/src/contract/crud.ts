import { name } from './common.js';
import {
    ContractId,
    Contract,
    validateId,
    validate,
    ContractWithObjects,
    hydrate,
    encode,
    ContractIndexInput,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const ContractCRUD = createCRUDModel<typeof name, ContractId, Contract, ContractWithObjects, ContractIndexInput>(
    name,
    {
        validateId,
        validate,
        toPrimaryKey,
        hydrate,
        encode,
    },
);
export default ContractCRUD;
