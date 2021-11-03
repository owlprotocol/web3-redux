import Interface from '../model/interface';
import select from './select';

function selectByIdSingle(state: any, id: string | undefined): Interface | undefined {
    if (!id) return undefined;

    return select(state, id) as Interface | undefined;
}

export default selectByIdSingle;
