export * from './indexCRUD.js';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch.js';

export type SagaAction = FetchAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchAction(action);
}

export type { FetchAction };

export { FETCH, fetch, isFetchAction };
