import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm';
import { Network } from '../../network/model';
import selectByIdSingle from './selectByIdSingle';

export const selectConfig = (state: any) => {
    return selectByIdSingle(state, '0');
};

type selectNetworkId = (state: any) => string | undefined;
export const selectNetworkId: selectNetworkId = (state: any) => {
    return selectConfig(state)?.networkId;
};

type selectNetwork = (state: any) => Network | undefined;
export const selectNetwork: selectNetwork = createSelector(getOrm(), (session: any) => {
    const { Config } = session;
    return Config.withId(0)?.network;
});

type selectAccount = (state: any) => string | undefined;
export const selectAccount: selectAccount = (state: any) => {
    return selectConfig(state)?.account;
};

export default selectConfig;
