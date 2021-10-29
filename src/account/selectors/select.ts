import { createSelector } from 'redux-orm';
import { name } from '../common';
import { orm } from '../../orm';

const select = createSelector(orm[name]);

export default select;
