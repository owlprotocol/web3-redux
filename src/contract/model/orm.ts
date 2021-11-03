import { attr, fk, Model as ORMModel } from 'redux-orm';

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
    };
}

export default Model;
