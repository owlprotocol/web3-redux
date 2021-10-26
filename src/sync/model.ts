import { attr, Model as ORMModel } from 'redux-orm';
import { Action } from 'redux';
import { Block } from '../block/model';
import { Transaction } from '../transaction/model';
import { ContractEvent } from '../contractevent/model';

/**
 * Ethereum Sync. Represents middleware that will trigger actions on certain events.
 *
 * @param id - Used to index in redux-orm.
 * @param type - Type of sync. Block, Transaction, or Event.
 * @param filter - Filter function that serves as trigger.
 * @param actions - Actions to dispatch when triggered.
 */
export interface BaseSync {
    id?: string;
    type: string;
    filter: (x: any) => boolean;
    actions: Action[];
}

export interface BlockSync extends BaseSync {
    type: 'Block';
    filter: (x: Block) => boolean;
}

export interface TransactionSync extends BaseSync {
    type: 'Transaction';
    filter: (x: Transaction) => boolean;
}

export interface EventSync extends BaseSync {
    type: 'Event';
    filter: (x: ContractEvent) => boolean;
}

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
    };
}

export { Model };
