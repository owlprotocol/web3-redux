import { ORM } from 'redux-orm';
import NetworkModel from './network/orm';
import BlockModel from './block/orm';
import TransactionModel from './transaction/orm';
import ContractModel from './contract/model/orm';
import ContractEventModel from './contractevent/orm';
import ContractSendModel from './contractsend/orm';
import EthCallModel from './ethcall/orm';
import ConfigModel from './config/orm';
import AccountModel from './account/orm';
import SyncModel from './sync/model/orm';
import { blockTransactionsSync } from './sync/model/BlockSync';

const orm = new ORM({
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

export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();

    // By default, add blockTransactionsSync which dispatches
    // createTransaction actions when block is created
    const { Sync } = orm.mutableSession(state);
    Sync.create(blockTransactionsSync);

    return state;
};

export { orm };
