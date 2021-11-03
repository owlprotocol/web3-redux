import { Interface, Id } from '../model/interface';
import select from './select';

function selectByIdSingle(state: any, id: Id | undefined): Interface | undefined {
    if (!id) return undefined;
    return select(state, id) as Interface | undefined;
}

export default selectByIdSingle;
