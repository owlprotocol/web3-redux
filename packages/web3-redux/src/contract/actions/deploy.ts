import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { name } from '../common.js';

/** @internal */
export const DEPLOY = `${name}/DEPLOY`;
/** @internal */
export interface DeployActionInput {
    networkId: string;
    abi: AbiItem[];
    bytecode: string;
    args?: any[];
    from: string;
    label?: string;
    tags?: string[];
}
/**
/** @category Actions */
export const deployAction = createAction(DEPLOY, (payload: DeployActionInput, uuid?: string) => {
    return {
        payload: { ...payload, from: payload.from?.toLowerCase() },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type DeployAction = ReturnType<typeof deployAction>;
/** @internal */
export const isDeployAction = deployAction.match;

export default deployAction;
