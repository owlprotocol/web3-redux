import selectByIdMany from './selectByIdMany';
import selectByIdSingle from './selectByIdSingle';

function selectById(state: any, id: string | string[] | undefined) {
    if (Array.isArray(id)) {
        return selectByIdMany(state, id);
    } else {
        return selectByIdSingle(state, id);
    }
}

export default selectById;
