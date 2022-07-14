import { name } from './common.js';
import { ReduxErrorId, ReduxError, ReduxErrorWithObjects } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ErrorCRUD = createCRUDModel<typeof name, ReduxErrorId, ReduxError, ReduxErrorWithObjects>(name);
export default ErrorCRUD;
