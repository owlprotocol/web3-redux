import { ReducerAction, isSetNetworkIdAction, isSetAccountAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const { Config } = sess;

    if (isSetNetworkIdAction(action)) {
        const networkId = action.payload;
        //Config is singleton
        Config.upsert({ id: 0, networkId });
    } else if (isSetAccountAction(action)) {
        //@ts-ignore Weird bug type never
        const account = action.payload;
        Config.upsert({ id: 0, account });
    }

    return sess;
}
