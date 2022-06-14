import select from './select.js';
import { Http } from '../model/index.js';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): Http | undefined {
    if (!id) return undefined;

    return select(state, id) as Http | undefined;
}

export default selectByIdSingle;
