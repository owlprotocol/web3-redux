import select from './select.js';
import { Sync } from '../model/index.js';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): Sync | undefined {
    if (!id) return undefined;
    //@ts-ignore
    return select(state, id) as Sync | undefined;
}

export default selectByIdSingle;
