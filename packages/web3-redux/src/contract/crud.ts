import { name } from './common.js';
import { ContractId, Contract, validateId, validate, ContractWithObjects, hydrate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractCRUD = createCRUDModel<'Contract', ContractId, Contract, ContractWithObjects>(
    name,
    validateId,
    validate,
    hydrate,
);
export default ContractCRUD;
