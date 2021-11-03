import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm';

const select = createSelector(getOrm().Sync);

export default select;
