import { ORM } from 'redux-orm';
import NetworkModel from './network/model/orm';
import BlockModel from './block/model/orm';
import TransactionModel from './transaction/model/orm';
import ContractModel from './contract/model/orm';
import ContractEventModel from './contractevent/model/orm';
import ContractEventIndexModel from './contracteventindex/model/orm';
import ContractSendModel from './contractsend/model/orm';
import EthCallModel from './ethcall/model/orm';
import ConfigModel from './config/model/orm';
import SyncModel from './sync/model/orm';
import _4ByteModel from './4byte/model/orm';

//Fix undefined import issue
let orm = getOrm();
/** @internal */
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
    orm.register(ContractEventIndexModel);
    orm.register(ContractSendModel);
    orm.register(EthCallModel);
    orm.register(ConfigModel);
    orm.register(SyncModel);
    orm.register(_4ByteModel);

    return orm;
}

/** @internal */
export const initializeState = (orm: any) => {
    //TODO: redux-persist state reconciler might break this
    const state = orm.getEmptyState();

    //TODO: Merge initial state redux-persist??
    const { Config } = orm.mutableSession(state);
    Config.create({ id: 0, account: null, networkId: null });

    return state;
};
