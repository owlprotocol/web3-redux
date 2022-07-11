import { name } from './common.js';
import { TransactionId, Transaction, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const TransactionCRUD = createCRUDModel<typeof name, TransactionId, Transaction, Transaction>(
    name,
    validateId,
    validate,
);
export default TransactionCRUD;
