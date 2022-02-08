import { attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'contentId',
    };

    static modelName = name;

    static fields = {
        contentId: attr(),
        networkId: attr(),
        ipfsUrl: attr(),
    };
}
