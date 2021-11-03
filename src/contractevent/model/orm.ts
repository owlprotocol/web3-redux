import { fk, attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = name;

    static fields = {
        id: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'events' }),
        blockHash: attr(),
        logIndex: attr(),
        contractId: fk({ to: 'Contract', as: 'contract', relatedName: 'events' }),
        address: attr(),
        name: attr(),
    };
}
