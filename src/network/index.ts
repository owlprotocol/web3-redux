/**
 * Comments on Network module
 * @module Network
 */

export * from './model';
export * from './actions';
export * from './selectors';
export * from './reducer';
export * from './hooks';

import Model from './model';
import Selectors from './selectors';
import Actions from './actions';
export default {
    ...Model,
    ...Selectors,
    ...Actions,
};
