import { IconButton } from '@chakra-ui/react';
import { useFavorite } from './useFavorite.js';
import { Address } from '../../../interfaces/Address.js';
import Icon from '../../Icon/index.js';

export type AddressFavoriteButtonProps = Address;

export const AddressFavoriteButton = ({ networkId, address }: AddressFavoriteButtonProps) => {
    const [isFavorite, { toggleFavorite }] = useFavorite(networkId, address);
    return (
        <IconButton
            bg={'transparent'}
            onClick={toggleFavorite}
            aria-label={'mark as favorite'}
            icon={<Icon icon={isFavorite ? 'heart.active' : 'heart'} />}
        />
    );
};

export { useFavorite };
