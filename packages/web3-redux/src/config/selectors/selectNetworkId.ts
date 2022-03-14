import { selectConfig } from './selectConfig.js';

/** @category Selectors */
export function selectNetworkId(state: any) {
    return selectConfig(state)?.networkId;
}

export default selectNetworkId;
