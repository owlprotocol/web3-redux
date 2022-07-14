import { name } from './common.js';
import { TransactionId, Transaction, validateId, validate, TransactionIndexInput } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const TransactionCRUD = createCRUDModel<
    typeof name,
    TransactionId,
    Transaction,
    Transaction,
    TransactionIndexInput
>(name, validateId, validate);
export default TransactionCRUD;
