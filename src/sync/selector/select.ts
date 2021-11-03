import { createSelector } from 'redux-orm';
import ORM from '../../orm';

const select = createSelector(ORM.orm.Sync);

export default select;
