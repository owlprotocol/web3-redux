import { put, call } from 'typed-redux-saga/macro';
import { set, FetchIpfsAction } from '../actions';
import { create } from 'ipfs-http-client';

async function getData(hash: string) {
    const node = create({ url: 'https://ipfs.infura.io:5001/api/v0' });
    try {
        //returns async generator function
        const data = await node.cat(hash);
        let contents: Uint8Array = new Uint8Array();
        // loop over incoming data
        for await (const item of data) {
            // turn string buffer to string and append to contents
            contents = Buffer.concat([contents, item]);
        }

        return contents;
    } catch (err) {
        console.log(err);
    }
}

/** @category Sagas */
export function* fetchIpfs(action: FetchIpfsAction) {
    const { payload } = action;
    const { contentId } = payload;

    const data = yield* call(getData, contentId); //throws error
    yield* put(set({ id: { contentId }, key: 'data', value: data }));
}

export default fetchIpfs;
