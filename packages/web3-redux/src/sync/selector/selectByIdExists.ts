import selectByIdSingle from './selectByIdSingle.js';

/** @category Selectors */
function selectByIdExists(state: any, id: string | undefined): boolean {
    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;
