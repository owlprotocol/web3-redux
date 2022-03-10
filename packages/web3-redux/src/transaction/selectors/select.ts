import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';

const orm = getOrm();
/** @internal */
const select = createSelector(orm[name]);

export default select;
