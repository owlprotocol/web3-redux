import { name } from './common.js';
import {
    TransactionId,
    Transaction,
    validate,
    TransactionIndexInput,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const TransactionCRUD = createCRUDModel<
    typeof name,
    TransactionId,
    Transaction,
    Transaction,
    TransactionIndexInput
>(name, { validate, validateId, toPrimaryKey });
export default TransactionCRUD;
