import { attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common.js';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'signatureHash',
    };

    static modelName = name;

    static fields = {
        signatureHash: attr(),
    };
}
