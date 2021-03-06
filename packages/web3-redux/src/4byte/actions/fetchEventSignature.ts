import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';
import { name } from '../common.js';
import { _4ByteSignatureId } from '../model/index.js';

/** @internal */
export const FETCH_EVENT_SIGNATURE = `${name}/FETCH_EVENT_SIGNATURE`;
/** @category Actions */
export const fetchEventSignatureAction = createAction(
    FETCH_EVENT_SIGNATURE,
    (payload: _4ByteSignatureId, uuid?: string) => {
        return {
            payload,
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    },
);
/** @internal */
export type FetchEventSignatureAction = ReturnType<typeof fetchEventSignatureAction>;
/** @internal */
export const isFetchEventSignatureAction = fetchEventSignatureAction.match;
