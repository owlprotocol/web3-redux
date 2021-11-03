import { createSelector } from 'redux-orm';
import { name } from '../common';
import ORM from '../../orm';

const select = createSelector(ORM.orm[name]);

export default select;
