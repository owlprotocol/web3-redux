import { name } from './common.js';
import { TransactionId, Transaction, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const TransactionCRUD = createCRUDModel<'Transaction', TransactionId, Transaction>(name, validateId, validate);
export default TransactionCRUD;
