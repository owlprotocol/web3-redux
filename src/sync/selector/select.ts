import { createSelector } from 'redux-orm';
import { orm } from '../../orm';

const select = createSelector(orm.Sync);

export default select;
