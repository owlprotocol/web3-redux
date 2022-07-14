import { name } from './common.js';
import { TransactionId, Transaction, validate, TransactionIndexInput } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const TransactionCRUD = createCRUDModel<
    typeof name,
    TransactionId,
    Transaction,
    Transaction,
    TransactionIndexInput
>(name, { validate });
export default TransactionCRUD;
