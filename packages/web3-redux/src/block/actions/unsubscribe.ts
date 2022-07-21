import { createAction } from '../../utils/createAction.js';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

/** @internal */
export const UNSUBSCRIBE = `${name}/UNSUBSCRIBE`;
/** @category Actions */
export const unsubscribe = createAction(UNSUBSCRIBE, (payload: string, uuid?: string) => {
    return {
        payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

/** @internal */
export type UnsubscribeAction = ReturnType<typeof unsubscribe>;
/** @internal */
export const isUnsubscribeAction = unsubscribe.match;

export default unsubscribe;
