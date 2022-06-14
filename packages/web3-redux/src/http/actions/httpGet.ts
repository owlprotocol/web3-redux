import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { Http } from '../model/index.js';

/** @internal */
export const HTTP_GET = `${name}/HTTP_GET`;
/** @category Action */
export const httpGet = createAction(HTTP_GET, (payload: Http) => {
    return { payload, meta: { uuid: uuidv4() } };
});
/** @internal */
export type HttpGetAction = ReturnType<typeof httpGet>;
/** @internal */
export const isHttpGetAction = httpGet.match;

export default httpGet;
