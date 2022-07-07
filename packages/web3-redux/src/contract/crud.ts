import { name } from './common.js';
import { ContractId, Contract, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ContractCRUD = createCRUDModel<ContractId, Contract, 'Contract'>(name, validateId, validate);
export default ContractCRUD;
