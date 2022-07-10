import { name } from './common.js';
import { ConfigId, Config, validateId, validate, hydrate, ConfigWithObjects, encode } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ConfigCRUD = createCRUDModel<'Config', ConfigId, Config, ConfigWithObjects>(
    name,
    validateId,
    validate,
    hydrate,
    encode,
);
export default ConfigCRUD;
