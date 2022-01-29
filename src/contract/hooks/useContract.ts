import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AbiItem } from 'web3-utils';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { create, fetchBalanceSynced, fetchNonceSynced, getCode } from '../actions';
import { GetBalanceSyncedActionInput } from '../actions/getBalanceSynced';
import { GetNonceSyncedActionInput } from '../actions/getNonceSynced';
import { selectByIdSingle } from '../selectors';
import { BaseWeb3Contract } from '../model';

/**
 * Creates a contract/EOA if it doesn't exist.
 * Reads ethereum data and optionally syncs data.
 * @category Hooks
 *
 */
//TODO: 'once' always refreshses, 'ifnull' should refresh only if empty
export function useContract<T extends BaseWeb3Contract = BaseWeb3Contract>(
    networkId: string | undefined,
    address: string | undefined,
    abi?: AbiItem[] | undefined,
    sync?: {
        getBalance?: GetBalanceSyncedActionInput['sync'];
        getNonce?: GetNonceSyncedActionInput['sync'];
        getCode?: false | 'once';
        fetchAbi?: false | 'once';
    },
) {
    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectByIdSingle<T>(state, id));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const explorerApiExists = !!network?.explorerApiUrl;
    const contractExists = !!contract;
    const codeExists = !!contract?.code;
    const abiExists = !!contract?.abi;

    //Create if inexistant account
    useEffect(() => {
        if (id && !contractExists) dispatch(create({ ...id, abi }));
    }, [dispatch, id, abi, contractExists]);

    //Get balance
    const getBalanceAction = useMemo(() => {
        if (id && web3Exists && contractExists && sync?.getBalance) {
            return fetchBalanceSynced({ ...id, sync: sync.getBalance });
        }
        return undefined;
    }, [id, contractExists, web3Exists, sync?.getBalance]);
    //const balanceExists = account?.balance != undefined;
    const getBalanceSyncId = getBalanceAction?.payload.sync?.id;
    //const fetchBalanceExists = useSelector((state) => selectSyncExists(state, fetchBalanceId));
    useEffect(() => {
        if (getBalanceAction) {
            dispatch(getBalanceAction);
        }
        return () => {
            if (getBalanceSyncId) dispatch(removeSync(getBalanceSyncId));
        };
    }, [dispatch, getBalanceAction, getBalanceSyncId]);

    //Get nonce
    const getNonceAction = useMemo(() => {
        if (id && web3Exists && contractExists && sync?.getNonce) {
            return fetchNonceSynced({ ...id, sync: sync.getNonce });
        }
        return undefined;
    }, [id, contractExists, web3Exists, sync?.getNonce]);
    //const nonceExists = account?.nonce != undefined;
    const getNonceSyncId = getNonceAction?.payload.sync?.id;
    //const fetchNonceExists = useSelector((state) => selectSyncExists(state, fetchNonceId));
    useEffect(() => {
        //Exists is not a dependency to avoid infinite loop
        if (getNonceAction) {
            dispatch(getNonceAction);
        }
        return () => {
            if (getNonceSyncId) dispatch(removeSync(getNonceSyncId));
        };
    }, [dispatch, getNonceAction, getNonceSyncId]);

    //Get code
    const getCodeAction = useMemo(() => {
        if (id && web3Exists && contractExists && sync?.getCode) {
            return getCode({ ...id });
        }
        return undefined;
    }, [id, contractExists, web3Exists, sync?.getCode]);

    useEffect(() => {
        if (getCodeAction && !codeExists) dispatch(getCodeAction);
    }, [dispatch, getCodeAction]);

    //Fetch abi (Etherscan)
    const fetchAbiAction = useMemo(() => {
        if (id && explorerApiExists && contractExists && sync?.fetchAbi) {
            return getCode({ ...id });
        }
        return undefined;
    }, [id, contractExists, explorerApiExists, sync?.fetchAbi]);

    useEffect(() => {
        if (fetchAbiAction && !abiExists) dispatch(getCodeAction);
    }, [dispatch, fetchAbiAction]);

    return contract;
}

/** @category Hooks */
export function contractHookFactory<T extends BaseWeb3Contract = BaseWeb3Contract>(abi: AbiItem[]) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContract<T>(networkId, address, abi);
    };
}

export default useContract;
