import { createAction } from '@reduxjs/toolkit';

const name = 'Config';

export const SET_NETWORK_ID = `${name}/SET_NETWORK_ID`;
export const SET_ACCOUNT = `${name}/SET_ACCOUNT`;

export const setNetworkId = createAction<string | undefined>(SET_NETWORK_ID);
export type SetNetworkIdAction = ReturnType<typeof setNetworkId>;
export const isSetNetworkIdAction = setNetworkId.match;

export const setAccount = createAction<string | undefined>(SET_ACCOUNT);
export type SetAccountAction = ReturnType<typeof setAccount>;
export const isSetAccountAction = setAccount.match;

export type ReducerAction = SetNetworkIdAction | SetAccountAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isSetNetworkIdAction(action) || isSetAccountAction(action);
}

export type Action = ReducerAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}
