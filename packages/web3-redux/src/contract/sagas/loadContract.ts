import { put as putSaga, call, select } from 'typed-redux-saga';
import { v4 as uuidv4 } from 'uuid';
import loadNetwork from '../../network/sagas/loadNetwork.js';
import ContractCRUD from '../crud.js';
import { ContractId } from '../model/interface.js';

function* loadContract({ networkId, address }: ContractId, uuid?: string) {
    const id = uuid ?? uuidv4();
    const network = yield* call(loadNetwork, networkId, id);

    const reduxSelected = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    const dbSelected = yield* call(ContractCRUD.db.get, { networkId, address });

    if (
        ((!reduxSelected?.web3Contract && network?.web3) ||
            (!reduxSelected?.web3SenderContract && network?.web3Sender)) &&
        dbSelected?.abi
    ) {
        //Hydrate
        yield* putSaga(ContractCRUD.actions.update(dbSelected, id));
        return yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    }

    return reduxSelected;
}

export default loadContract;
