import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import ContractCRUD from '../crud.js';
import deployAction, { DeployActionInput } from '../actions/deploy.js';
import ErrorCRUD from '../../error/crud.js';

/**
 * Check if contract exists on-chain, autodeploy/return deploy callback.
 * @param networkId
 * @param address
 * @param defaultContract
 */
export function useDeploy(input: Partial<DeployActionInput> | undefined, address?: string, auto = false) {
    const dispatch = useDispatch();
    const { networkId, abi, bytecode, from, args, label, tags } = input ?? {};
    const [contractExisting, { exists }] = ContractCRUD.hooks.useHydrate({ networkId, address });
    const contractsLabelled = ContractCRUD.hooks.useSelectWhere({ networkId, label });
    const contractLabelled = contractsLabelled.length > 0 ? contractsLabelled[0] : undefined;
    const contract = contractExisting ?? contractLabelled;

    //Action
    const action = useMemo(() => {
        if (networkId && abi && bytecode && from) {
            return deployAction({ networkId, abi, bytecode, from, args, label, tags });
        }
    }, [networkId, abi, bytecode, from, args, label, tags]);
    //Callback
    const deploy = useCallback(() => {
        if (action) dispatch(action);
    }, [action]);
    //Effect
    //TODO: if address specified check with getCode
    useEffect(() => {
        if (!exists && auto) deploy();
    }, [deploy, exists, auto]);

    //Error
    const [reduxError] = ErrorCRUD.hooks.useGet(action?.meta.uuid);
    const error = useMemo(() => {
        if (!networkId) return new Error('networkId undefined');
        else if (!abi) return new Error('abi undefined');
        else if (!bytecode) return new Error('bytecode undefined');
        else if (!from) return new Error('from undefined');
        else if (!!reduxError) {
            const err = new Error(reduxError.errorMessage);
            err.stack = reduxError.stack;
            return err;
        }
    }, [networkId, abi, bytecode, from, reduxError]);

    const returnOptions = {
        action,
        deploy,
        error,
    };

    return [contract, returnOptions] as [typeof contract, typeof returnOptions];
}

export default useDeploy;
