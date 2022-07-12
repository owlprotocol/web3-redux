import ConfigCRUD from '../crud.js';
import { Config } from '../model/index.js';

/**
 * @category Hooks
 * Returns the Config.withId(0).
 * Create/hydrate depending on db state.
 */
export function useConfig(defaultConfig?: Partial<Config>) {
    return ConfigCRUD.hooks.useHydrate({ id: '0' }, defaultConfig);
}

export default useConfig;
