import useConfig from './useConfig.js';

/**
 * @category Hooks
 * Returns the currently globally configured networkId and a setNetworkId
 * callback that will automatically dispatch an action.
 */
export function useNetworkId() {
    const [config, { setNetworkId }] = useConfig();
    const networkId = config?.networkId;
    return [networkId, setNetworkId] as [typeof networkId, typeof setNetworkId];
}

export default useNetworkId;
