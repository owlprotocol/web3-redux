import { CID } from 'multiformats';

export function isCID(hash: string) {
    try {
        CID.parse(hash);
    } catch (error) {
        console.error(`${hash} is not CID!`);
        throw error;
    }
}

export default isCID;
