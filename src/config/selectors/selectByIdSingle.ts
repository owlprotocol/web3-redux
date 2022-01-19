import Config from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): Config | undefined {
    if (!id) return undefined;

    return select(state, id) as Config | undefined;
}

export default selectByIdSingle;
