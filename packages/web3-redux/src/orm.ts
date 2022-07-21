import { ORM } from 'redux-orm';
import NetworkModel from './network/model/orm.js';
import ContractModel from './contract/model/orm.js';
import ConfigModel from './config/model/orm.js';

//Fix undefined import issue
let orm: any;
/** @internal */
export function getOrm(): any {
    if (orm) return orm;

    orm = new ORM({
        stateSelector: (state: any) => state.web3Redux,
    });
    orm.register(NetworkModel);
    orm.register(ContractModel);
    orm.register(ConfigModel);

    return orm;
}

/** @internal */
export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};
