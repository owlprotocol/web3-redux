import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm';

/** @internal */
const select = createSelector(getOrm().Sync);

export default select;
