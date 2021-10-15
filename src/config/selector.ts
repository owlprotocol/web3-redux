import { createSelector } from 'redux-orm';
import { Config } from './model';
import { orm } from '../orm';
import { Network } from '../network/model';

type selectByIdSingle = (state: any, id: string) => Config | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (Config | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.Config);
export const selectByIdSingle: selectByIdSingle = (state: any, id?: string) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as ReturnType<selectByIdSingle>;
};
export const selectByIdMany = selectById as selectByIdMany;

type select = (state: any) => Config | undefined;
export const select: select = (state: any) => {
    return selectByIdSingle(state, '0');
};

type selectNetworkId = (state: any) => string | undefined;
export const selectNetworkId: selectNetworkId = (state: any) => {
    return select(state)?.networkId;
};

type selectNetwork = (state: any) => Network | undefined;
export const selectNetwork: selectNetwork = createSelector(orm, (session: any) => {
    const { Config } = session;
    return Config.withId(0)?.network;
});

type selectAccount = (state: any) => string | undefined;
export const selectAccount: selectAccount = (state: any) => {
    return select(state)?.account;
};
