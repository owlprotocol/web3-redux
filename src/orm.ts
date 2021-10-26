import { ORM } from 'redux-orm';
import { Model as NetworkModel } from './network/model';
import { Model as BlockModel } from './block/model';
import { Model as TransactionModel } from './transaction/model';
import { Model as ContractModel } from './contract/model';
import { Model as ContractEventModel } from './contractevent/model';
import { Model as ContractSendModel } from './contractsend/model';
import { Model as EthCallModel } from './ethcall/model';
import { Model as ConfigModel } from './config/model';
import { Model as AccountModel } from './account/model';

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

export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};

export { orm };
