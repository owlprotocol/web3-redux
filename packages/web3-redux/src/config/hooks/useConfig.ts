import ConfigCRUD from '../crud.js';

/**
 * @category Hooks
 * Returns the Config.withId(0)
 */
export function useConfig() {
    return ConfigCRUD.hooks.useGet({ id: '0' });
}

export default useConfig;
