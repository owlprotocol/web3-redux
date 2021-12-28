import { createSelector } from 'redux-orm';
import { name } from '../common';
import { getOrm } from '../../orm';

const orm = getOrm();
/** @internal */
const select = createSelector(orm[name]);

export default select;
