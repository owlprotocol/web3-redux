import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm.js';

/** @internal */
const select = createSelector(getOrm().Sync);

export default select;
