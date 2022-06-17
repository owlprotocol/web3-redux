import { Action } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

export const LOAD_DB_ALL = `${name}/LOAD_DB_ALL`;
export const loadDBAllAction = (uuid?: string) => {
    return {
        type: LOAD_DB_ALL,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
};

export type LoadDBAllAction = ReturnType<typeof loadDBAllAction>;
export const isLoadDBAllAction = (action: Action) => action.type === LOAD_DB_ALL;

export default loadDBAllAction;
