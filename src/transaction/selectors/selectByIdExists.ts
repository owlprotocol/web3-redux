import { IdArgs } from '../model/interface';
import selectByIdSingle from './selectByIdSingle';

/** @category Selectors */
function selectByIdExists(state: any, id: IdArgs | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;
