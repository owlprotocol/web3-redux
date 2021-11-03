import { ORM } from 'redux-orm';
import NetworkModel from './network/model/orm';
import BlockModel from './block/model/orm';
import TransactionModel from './transaction/model/orm';
import ContractModel from './contract/model/orm';
import ContractEventModel from './contractevent/model/orm';
import ContractSendModel from './contractsend/model/orm';
import EthCallModel from './ethcall/model/orm';
import ConfigModel from './config/model/orm';
import AccountModel from './account/model/orm';
import SyncModel from './sync/model/orm';
import { blockTransactionsSync } from './sync/model/BlockSync';

//Fix undefined import issue
let orm = getOrm();
export function getOrm(): any {
    if (orm) return orm;

    orm = new ORM({
        stateSelector: (state: any) => state.web3Redux,
    });
    orm.register(NetworkModel);
    orm.register(BlockModel);
    orm.register(TransactionModel);
    orm.register(ContractModel);
    orm.register(ContractEventModel);
    orm.register(ContractSendModel);
    orm.register(EthCallModel);
    orm.register(ConfigModel);
    orm.register(AccountModel);
    orm.register(SyncModel);

    return orm;
}

export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();

    // By default, add blockTransactionsSync which dispatches
    // createTransaction actions when block is created
    const { Sync } = orm.mutableSession(state);
    Sync.create(blockTransactionsSync);

    return state;
};
