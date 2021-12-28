import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm';
import { Network } from '../../network/model';
import selectByIdSingle from './selectByIdSingle';

/** @category Selectors */
export const selectConfig = (state: any) => {
    return selectByIdSingle(state, '0');
};

/** @internal */
type selectNetworkId = (state: any) => string | undefined;
/** @category Selectors */
export const selectNetworkId: selectNetworkId = (state: any) => {
    return selectConfig(state)?.networkId;
};

/** @internal */
type selectNetwork = (state: any) => Network | undefined;
/** @category Selectors */
export const selectNetwork: selectNetwork = createSelector(getOrm(), (session: any) => {
    const { Config } = session;
    return Config.withId(0)?.network;
});

/** @internal */
type selectAccount = (state: any) => string | undefined;
/** @category Selectors */
export const selectAccount: selectAccount = (state: any) => {
    return selectConfig(state)?.account;
};

export default selectConfig;
