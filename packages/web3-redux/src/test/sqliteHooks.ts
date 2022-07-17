import { rmSync, existsSync } from 'fs';
import sleep from '../utils/sleep.js';
const sqliteDB = ['__sysdb__.sqlite', 'D_web3^Redux.sqlite'];

export const clearSQLite = async () => {
    await sleep(1000);
    //sqliteDB.forEach((p) => existsSync(p) && rmSync(p));
};
