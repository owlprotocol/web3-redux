import { name } from './common.js';
import { ReduxErrorId, ReduxError, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ErrorCRUD = createCRUDModel<typeof name, ReduxErrorId, ReduxError>(name, validateId, validate);
export default ErrorCRUD;
