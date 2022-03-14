import { selectConfig } from './selectConfig.js';

/** @category Selectors */
export function selectIpfsUrl(state: any) {
    return selectConfig(state)?.ipfsUrl;
}

export default selectIpfsUrl;
