import { AddressInfo, Server } from 'net';
import sleep from './sleep';

export default async (httpServer: Server, ms: number): Promise<number> => {
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
