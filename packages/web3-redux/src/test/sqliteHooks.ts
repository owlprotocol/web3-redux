import { rmSync, existsSync } from 'fs';
const sqliteDB = ['__sysdb__.sqlite', 'D_web3^Redux.sqlite'];

export const clearSQLite = () => {
    sqliteDB.forEach((p) => existsSync(p) && rmSync(p));
};
