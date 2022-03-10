import { selectConfig } from './selectConfig.js';

/** @category Selectors */
export function selectAccount(state: any) {
    return selectConfig(state)?.account;
}

export default selectAccount;
