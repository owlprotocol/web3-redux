/* eslint-disable @typescript-eslint/no-var-requires */
import { Action, Reducer, combineReducers } from 'redux';
import { REDUX_ROOT } from './common.js';
import ConfigCRUD from './config/crud.js';
import ContractCRUD from './contract/crud.js';
import NetworkCRUD from './network/crud.js';
import { getOrm, initializeState } from './orm.js';

export const reducerWithOrm: Reducer = (state: any, action: Action) => {
    const orm = getOrm();
    const sess = orm.session(state || initializeState(orm));

    if (ConfigCRUD.isAction(action)) ConfigCRUD.reducer(sess, action);
    else if (ContractCRUD.isAction(action)) ContractCRUD.reducer(sess, action);
    else if (NetworkCRUD.isAction(action)) NetworkCRUD.reducer(sess, action);

    return sess.state;
};

export const createRootReducer = (reducerWeb3Redux: Reducer) => {
    return combineReducers({
        [REDUX_ROOT]: reducerWeb3Redux,
    });
};

export const rootReducer = createRootReducer(reducerWithOrm);
export default rootReducer;
