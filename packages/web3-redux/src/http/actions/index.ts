export * from './indexCRUD.js';
import { HTTP_GET, httpGet, HttpGetAction, isHttpGetAction } from './httpGet.js';

/** @internal */
export type SagaAction = HttpGetAction;

/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isHttpGetAction(action);
}

export type { HttpGetAction };

export { HTTP_GET, httpGet, isHttpGetAction };
