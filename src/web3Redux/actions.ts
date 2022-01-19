import { SubscribeActionInput } from '../block/actions/subscribe';
import { Network } from '../network/model';

const name = 'WEB3_REDUX';
export const INITIALIZE = `${name}/INITIALIZE`;

export const SELECT_ERROR = 'SELECT_ERROR';

export interface NetworkWithSubscribe extends Network {
    blockSubscribe?: SubscribeActionInput | boolean;
}
export interface InitializeActionInput {
    networks?: NetworkWithSubscribe[];
    blockSubscribe?: boolean;
}
export const initialize = (payload?: InitializeActionInput) => {
    return {
        type: INITIALIZE,
        payload: payload ?? {},
    };
};
export type InitializeAction = ReturnType<typeof initialize>;

export type Action = InitializeAction;
