import { SubscribeActionInput } from '../block/actions';
import { NetworkPartial } from '../network/model';

const name = 'WEB3_REDUX';
export const INITIALIZE = `${name}/INITIALIZE`;

export const SELECT_ERROR = 'SELECT_ERROR';

export interface NetworkWithSubscribe extends NetworkPartial {
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
