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
} from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractCRUD = createCRUDModel<typeof name, ContractId, Contract, ContractWithObjects, ContractIndexInput>(
    name,
    validateId,
    validate,
    hydrate,
    encode,
);
export default ContractCRUD;
