import { Id } from '../model/interface';
import selectByIdSingle from './selectByIdSingle';

function selectByIdExists(state: any, id: Id | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;
