import { createSelector } from 'redux-orm';
import { name } from '../common';
import { getOrm } from '../../orm';

/** @internal */
const select = createSelector(getOrm()[name]);

export default select;
