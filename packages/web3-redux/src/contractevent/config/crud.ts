import { name } from './common.js';
import { ConfigId, Config, validateId, validate } from './model/index.js';
import createCRUDModel from '../../createCRUDModel.js';

export const ConfigCRUD = createCRUDModel<ConfigId, Config, 'Config'>(name, validateId, validate);
export default ConfigCRUD;
