import ConfigCRUD from '../crud.js';

/**
 * @category Hooks
 * Returns the Config.withId(0)
 */
export function useConfig() {
    const config = ConfigCRUD.hooks.useGet({ id: '0' });
    return config;
}

export default useConfig;
