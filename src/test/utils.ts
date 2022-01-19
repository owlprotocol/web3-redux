import { assert } from 'chai';
import Web3 from 'web3';
import { AddressInfo, Server } from 'net';
import { EventEmitter } from 'events';

export const addressList = [
    '0x0000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000002',
    '0x0000000000000000000000000000000000000003',
    '0x0000000000000000000000000000000000000004',
    '0x0000000000000000000000000000000000000005',
    '0x0000000000000000000000000000000000000006',
];

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sleepForPort = async (httpServer: Server, ms: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        httpServer.listen(0, async () => {
            try {
                let addr = httpServer.address() as AddressInfo | null;
                while (!(addr && addr.port)) {
                    await sleep(ms);
                    addr = httpServer.address() as AddressInfo | null;
                }
                resolve(addr.port);
            } catch (e) {
                reject(e);
            }
        });
    });
};

export function assertDeepEqual(a: any, b: any, ignore: string[], message?: string) {
    if (Array.isArray(a) && Array.isArray(b)) {
        const a1 = a.map((x) => {
            const x1 = { ...x };
            ignore.forEach((f) => {
                x1[f] = undefined;
            });
            return { ...x1 };
        });
        const b1 = b.map((x) => {
            const x1 = { ...x };
            ignore.forEach((f) => {
                x1[f] = undefined;
            });
            return { ...x1 };
        });

        assert.deepEqual(a1, b1, message);
    } else {
        const a1 = { ...a };
        const b1 = { ...b };
        ignore.forEach((f) => {
            (a1[f] = undefined), (b1[f] = undefined);
        });
        assert.deepEqual(a1, b1, message);
    }
}

export async function mineBlock(web3: Web3) {
    await new Promise((resolve) => {
        //@ts-ignore
        web3?.currentProvider.send({ method: 'evm_mine', params: [] }, resolve);
    });
}

interface LogEmitter extends EventEmitter {
    log(msg: string): any;
}
export function ganacheLogger(): LogEmitter {
    //@ts-ignore
    const emitter: LogEmitter = new EventEmitter();
    emitter.log = (message: string) => {
        message = message.replace(/</g, '').replace(/>/g, '');
        emitter.emit('log', message);

        try {
            const rpcMessage = JSON.parse(message);
            if (Array.isArray(rpcMessage)) {
                //Ignore rpc response log
                if (rpcMessage[0].method) {
                    emitter.emit('rpc_batch', rpcMessage);
                    //Batched rpc call
                    rpcMessage.forEach((m) => {
                        if (!!m.jsonrpc) {
                            emitter.emit('rpc', rpcMessage);
                        }
                        if (!!m.method) {
                            emitter.emit(m.method, rpcMessage);
                        }
                    });
                }
            } else {
                //Ignore rpc response log
                if (!!rpcMessage.jsonrpc) {
                    emitter.emit('rpc', rpcMessage);
                }
                if (!!rpcMessage.method) {
                    emitter.emit(rpcMessage.method, rpcMessage);
                }
            }
        } catch {}
    };

    return emitter;
}
