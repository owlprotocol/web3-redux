import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import { Interface as Network } from '../../network/model/interface';
import selectByIdSingle from './selectByIdSingle';

export const selectConfig = (state: any) => {
    return selectByIdSingle(state, '0');
};

type selectNetworkId = (state: any) => string | undefined;
export const selectNetworkId: selectNetworkId = (state: any) => {
    return selectConfig(state)?.networkId;
};

type selectNetwork = (state: any) => Network | undefined;
export const selectNetwork: selectNetwork = createSelector(orm, (session: any) => {
    const { Config } = session;
    return Config.withId(0)?.network;
});

type selectAccount = (state: any) => string | undefined;
export const selectAccount: selectAccount = (state: any) => {
    return selectConfig(state)?.account;
};

export default selectConfig;
