import ConfigCRUD from '../crud.js';

/**
 * @category Hooks
 * Returns the Config.withId(0)
 */
export function useConfig() {
    const configResponse = ConfigCRUD.hooks.useGet({ id: '0' });
    const configLoading = configResponse === 'loading';
    const config = configLoading ? undefined : configResponse;
    return config;
}

export default useConfig;
