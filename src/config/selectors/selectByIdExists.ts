import selectByIdSingle from './selectByIdSingle';

function selectByIdExists(state: any, id: string | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;
