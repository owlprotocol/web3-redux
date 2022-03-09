import { CID } from 'multiformats';

export function isCID(hash: string) {
    try {
        CID.parse(hash);
        return true;
    } catch (error) {
        return false;
    }
}

export default isCID;
