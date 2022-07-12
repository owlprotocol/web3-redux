import { name } from './common.js';
import {
    ReduxErrorId,
    ReduxError,
    validateId,
    validate,
    ReduxErrorWithObjects,
    encode,
    hydrate,
} from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ErrorCRUD = createCRUDModel<typeof name, ReduxErrorId, ReduxError, ReduxErrorWithObjects>(
    name,
    validateId,
    validate,
    hydrate,
    encode,
);
export default ErrorCRUD;
