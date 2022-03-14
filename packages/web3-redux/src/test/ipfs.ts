import * as moxios from 'moxios';
//IPFS
export const HELLO_WORLD = 'Hello World!\n';
export const HELLO_WORLD_BLOCK = { Data: Buffer.from(HELLO_WORLD).toString('base64'), Links: [] };
export const HELLO_WORLD_QMHASH = 'QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u';

export const NFT_0 = { name: 'Test NFT 1' };
export const NFT_0_QMHASH = 'QmZyAnXBwWSheQQxNZ8kCECkQHCYc79F9XJuMZXwibZeCZ';
export const NFT_1_BLOCK = { Data: Buffer.from(JSON.stringify(NFT_0)).toString('base64'), Links: [] };

export const NFT_COLLECTION_BLOCK = {
    Data: Buffer.from([]).toString('base64'),
    Links: [
        {
            Hash: NFT_0_QMHASH,
            Name: '0',
        },
    ],
};
export const NFT_COLLECTION_QMHASH = 'QmVioGYCm7EBYiJaxaciouDf5DzXArkBzibMV8Le69Z123';

//QmHash
const ipfsMockStore: any = {
    [HELLO_WORLD_QMHASH]: { hash: HELLO_WORLD_QMHASH, content: HELLO_WORLD, pbNode: HELLO_WORLD_BLOCK },
    [NFT_0_QMHASH]: { hash: NFT_0_QMHASH, content: NFT_0, pbNode: NFT_1_BLOCK },
    [NFT_COLLECTION_QMHASH]: { hash: NFT_COLLECTION_QMHASH, pbNode: NFT_COLLECTION_BLOCK },
};

/** Create and start MockHTTP server that mocks IPFS API with some data */
export function moxiosIPFS() {
    return new Promise((resolve, reject) => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            if (request.config.url === '/api/v0/object/get') {
                const { arg } = JSON.parse(request.config.data);
                const pbNode = ipfsMockStore[arg].pbNode;
                const response = await request.respondWith({ status: 200, response: pbNode });
                resolve({ request, response });
            } else if (request.config.url === '/api/v0/cat') {
                const { arg } = JSON.parse(request.config.data);
                const content = ipfsMockStore[arg].content;
                const response = await request.respondWith({ status: 200, response: content });
                resolve({ request, response });
            } else if (request.config.url === `http://localhost/${NFT_COLLECTION_QMHASH}/0`) {
                //HTTP Api
                const response = await request.respondWith({ status: 200, response: NFT_0 });
                resolve({ request, response });
            } else {
                //@ts-ignore
                reject({ error: request.reject({ status: 400 }) });
            }
        });
    });
}

/*
export async function startMockIPFSNode() {
    const mockIPFSNode = getLocalMockHTTP();
    await mockIPFSNode.start();
    //object/get
    const p1 = mockIPFSNode
        .forPost(`${mockIPFSNode.url}/api/v0/object/get`)
        .withQuery({ arg: IPFS_HELLO_WORLD })
        .thenReply(200, JSON.stringify(DAG_NODE_HELLO_WORLD));
    //cat
    const p4 = mockIPFSNode
        .forPost(`${mockIPFSNode.url}/api/v0/cat`)
        .withQuery({ arg: IPFS_HELLO_WORLD })
        .thenReply(200, 'Hello World\n');

    await Promise.all([p1, p2, p3, p4, p5]);
    return mockIPFSNode;
}
*/
