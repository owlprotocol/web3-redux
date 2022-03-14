import { attr, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
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
