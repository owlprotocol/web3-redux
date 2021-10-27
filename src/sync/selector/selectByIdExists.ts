import selectByIdSingle from './selectByIdSingle';

function selectByIdExists(state: any, id: string | undefined): boolean {
    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;
