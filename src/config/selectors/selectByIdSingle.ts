import Interface from '../model/interface';
import select from './select';

function selectByIdSingle(state: any, id: string | undefined): Interface | undefined {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, idStr) as Interface | undefined;
}

export default selectByIdSingle;
