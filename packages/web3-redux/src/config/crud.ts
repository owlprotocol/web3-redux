import { name } from './common.js';
import {
    ConfigId,
    Config,
    hydrate,
    ConfigWithObjects,
    encode,
    toPrimaryKey,
    validateId,
    validate,
} from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const ConfigCRUD = createCRUDModel<typeof name, ConfigId, Config, ConfigWithObjects>(name, {
    hydrate,
    encode,
    validateId,
    toPrimaryKey,
    validate,
});
export default ConfigCRUD;
