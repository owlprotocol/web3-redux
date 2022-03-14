///import { CID } from 'multiformats';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isCID(hash: string) {
    return true;
    /*
    try {
        //TODO: Fix dependency
        //CID.parse(hash);
        return true;
    } catch (error) {
        return false;
    }
    */
}

export default isCID;
