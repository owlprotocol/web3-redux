import { Sync } from '../model';
import select from './select';

function selectByIdSingle(state: any, id: string | undefined): Sync | undefined {
    if (!id) return undefined;
    //@ts-ignore
    return select(state, id) as Sync | undefined;
}

export default selectByIdSingle;
