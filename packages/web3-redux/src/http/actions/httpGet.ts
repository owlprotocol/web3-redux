import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

interface HttpGetInput {
    url: string;
}
/** @internal */
export const HTTP_GET = `${name}/HTTP_GET`;
/** @category Action */
export const httpGet = createAction(HTTP_GET, (payload: HttpGetInput) => {
    return { payload, meta: { uuid: uuidv4() } };
});
/** @internal */
export type HttpGetAction = ReturnType<typeof httpGet>;
/** @internal */
export const isHttpGetAction = httpGet.match;

export default httpGet;
