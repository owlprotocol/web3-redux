import { selectConfig } from './selectConfig';

/** @category Selectors */
export function selectIpfsUrl(state: any) {
    return selectConfig(state)?.ipfsUrl;
}

export default selectIpfsUrl;
