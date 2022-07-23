import { useCallback } from 'react';
import { Contract } from '@owlprotocol/web3-redux';
import { useDispatch } from 'react-redux';

const FAVORITES = 'Favorites';
export const useFavorite = (networkId: string | undefined, address: string | undefined) => {
    const dispatch = useDispatch();

    const [contract] = Contract.hooks.useGet({ networkId, address });
    const tags = contract?.tags ?? [];
    const tagsHash = JSON.stringify(tags);
    const isFavorite = tags.includes(FAVORITES);

    const toggleFavorite = useCallback(() => {
        if (networkId && address) {
            if (!isFavorite) dispatch(Contract.actions.upsert({ networkId, address, tags: [...tags, FAVORITES] }));
            else dispatch(Contract.actions.upsert({ networkId, address, tags: tags.filter((t) => t != FAVORITES) }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, dispatch, isFavorite, tagsHash]);

    const returnOptions = { toggleFavorite };
    return [isFavorite, returnOptions] as [typeof isFavorite, typeof returnOptions];
};
