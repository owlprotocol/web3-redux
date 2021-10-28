import { attr, fk, Model as ORMModel } from 'redux-orm';

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Contract';

    static fields = {
        address: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'contracts' }),
        abi: attr(),
    };
}

export default Model;
