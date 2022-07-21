import { put as putSaga, call, select } from 'typed-redux-saga';
import { v4 as uuidv4 } from 'uuid';
import NetworkCRUD from '../crud.js';

function* loadNetwork(networkId: string, uuid?: string) {
    const reduxSelected = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    const dbSelected = yield* call(NetworkCRUD.db.get, networkId);
    if (!reduxSelected?.web3 && dbSelected?.web3Rpc) {
        //Hydrate
        yield* putSaga(NetworkCRUD.actions.upsert(dbSelected, uuid ?? uuidv4()));
        return yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    }

    return reduxSelected;
}

export default loadNetwork;
