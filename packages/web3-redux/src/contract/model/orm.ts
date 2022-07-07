import { attr, many, fk, Model as ORMModel } from 'redux-orm';

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Contract';

    static fields = {
        id: attr(),
        address: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'contracts' }),
        abi: attr(),
        methods: attr(),
        web3Contract: attr(),
        web3SenderContract: attr(),
        balance: attr(),
        nonce: attr(),
        code: attr(),
        ens: attr(),
        indexIds: many({
            to: 'ContractIndex',
            as: 'indexes',
            relatedName: 'contracts',
        }),
    };
}

export default Model;
