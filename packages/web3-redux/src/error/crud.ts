import { name } from './common.js';
import { ReduxErrorId, ReduxError, ReduxErrorWithObjects, hydrate } from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const ErrorCRUD = createCRUDModel<typeof name, ReduxErrorId, ReduxError, ReduxErrorWithObjects>(name, {
    hydrate,
});
export default ErrorCRUD;
