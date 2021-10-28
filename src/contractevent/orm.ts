import { attr, fk, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'ContractEvent';

    static fields = {
        id: attr(),
        contractId: fk({ to: 'Contract', as: 'contract', relatedName: 'events' }),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'events' }),
        address: attr(),
        name: attr(),
    };
}
