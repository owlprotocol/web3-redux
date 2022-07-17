import { put as putSaga, call, select } from 'typed-redux-saga';
import { v4 as uuidv4 } from 'uuid';
import ConfigCRUD from '../crud.js';

function* loadConfig(uuid?: string) {
    const reduxSelected = yield* select(ConfigCRUD.selectors.selectByIdSingle, '0');
    const dbSelected = yield* call(ConfigCRUD.db.get, '0');

    if (
        (!reduxSelected?._4byteClient && dbSelected?._4byteUrl) ||
        (!reduxSelected?.ipfsClient && dbSelected?.ipfsUrl)
    ) {
        //Hydrate
        yield* putSaga(ConfigCRUD.actions.update(dbSelected, uuid ?? uuidv4()));
        return yield* select(ConfigCRUD.selectors.selectByIdSingle, '0');
    }

    return reduxSelected;
}

export default loadConfig;
