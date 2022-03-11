import { ORM } from 'redux-orm';
import NetworkModel from './network/model/orm.js';
import BlockModel from './block/model/orm.js';
import TransactionModel from './transaction/model/orm.js';
import ContractModel from './contract/model/orm.js';
import ContractEventModel from './contractevent/model/orm.js';
import ContractEventIndexModel from './contracteventindex/model/orm.js';
import ContractSendModel from './contractsend/model/orm.js';
import EthCallModel from './ethcall/model/orm.js';
import ConfigModel from './config/model/orm.js';
import IpfsModel from './ipfs/model/orm.js';
import SyncModel from './sync/model/orm.js';
import _4ByteModel from './4byte/model/orm.js';
import { IPFS_URL, _4BYTE_URL } from './environment.js';

//Fix undefined import issue
let orm: any;
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
    orm.register(IpfsModel);
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
    Config.create({ id: 0, networkId: '1', ipfsUrl: IPFS_URL, _4byteUrl: _4BYTE_URL });

    return state;
};
