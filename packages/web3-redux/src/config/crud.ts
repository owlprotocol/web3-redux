import { name } from './common.js';
import { ConfigId, Config, hydrate, ConfigWithObjects, encode } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const ConfigCRUD = createCRUDModel<typeof name, ConfigId, Config, ConfigWithObjects>(name, {
    hydrate,
    encode,
});
export default ConfigCRUD;
