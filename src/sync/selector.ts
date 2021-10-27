import { createSelector } from 'redux-orm';
import { Sync } from './model';
import { orm } from '../orm';

const select = createSelector(orm.Sync);
export function selectByIdSingle(state: any, id?: string): Sync | undefined {
    if (!id) return undefined;
    //@ts-ignore
    return select(state, id) as Sync | undefined;
}
export function selectByIdMany(state: any, ids?: string[]): (Sync | null)[] {
    return select(state, ids);
}
export function selectById(state: any, id?: string | string[]) {
    if (Array.isArray(id)) {
        return selectByIdMany(state, id);
    } else {
        return selectByIdSingle(state, id);
    }
}

export function selectByIdExists(state: any, id?: string): boolean {
    return !!selectByIdSingle(state, id);
}
