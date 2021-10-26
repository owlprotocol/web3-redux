import { attr, Model as ORMModel } from 'redux-orm';
import BlockSync from './BlockSync';
import EventSync from './EventSync';
import TransactionSync from './TransactionSync';

export type Sync = BlockSync | TransactionSync | EventSync;

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Sync';

    static fields = {
        id: attr(),
        type: attr(),
        filter: attr(),
        actions: attr(),
        cache: attr(), //persistent state, used to avoid duplicate triggers, or track anything
    };
}

export { Model, BlockSync, EventSync, TransactionSync };
