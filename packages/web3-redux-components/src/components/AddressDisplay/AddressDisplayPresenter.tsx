import { useCallback, useEffect, useState } from 'react';
import { useTheme, Box, Button, IconButton, Input, StyleProps } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import Icon from '../Icon';
import NetworkIcon from '../NetworkIcon';
import QRCodePopover from '../QRCodePopover';

// export interface ControlsOptions {

// }
export interface Props {
    address: string;
    label?: string;
    isFavorite?: boolean;
    borderRadius?: number;
    bg?: string;
    setFavorite?: (v: boolean) => void;
    setLabel?: (v: string) => void;
    controls?: string[];
    containerStyles?: StyleProps;
    networkId?: string;
}

export const AddressDisplayPresenter = ({
    address,
    label,
    isFavorite,
    borderRadius = 12,
    bg,
    setFavorite = (v) => console.log(`setFavorite(${v})`),
    setLabel = (v) => console.log(`setLabel(${v})`),
    controls = ['qr', 'copy', 'favorite', 'edit'],
    containerStyles,
    networkId,
}: Props) => {
    const theme = useTheme();
    const themes = theme.themes ?? {};

    const [editLabelText, setEditLabelText] = useState('');
    const [editLabel, setEditLabel] = useState(false);

    //Default edit input text
    useEffect(() => {
        setEditLabelText(label ?? '');
    }, [label]);

    const handleSave = useCallback(() => {
        setLabel(editLabelText);
        setEditLabel(false);
    }, [setLabel, editLabelText]);

    const handleInputKeyDown = useCallback(
        (e: any) => {
            if (e.key === 'Enter') handleSave();
        },
        [handleSave],
    );

    const handleEditOnClick = useCallback(() => {
        setEditLabel(true);
    }, [setEditLabel]);

    const handleEditOnChange = useCallback(({ target }: any) => {
        setEditLabelText(target.value);
    }, []);

    const handleCancelOnClick = useCallback(() => {
        setEditLabel(false);
    }, [setEditLabel]);

    const handleFavorite = useCallback(() => {
        setFavorite(!isFavorite);
    }, [setFavorite, isFavorite]);

    const handleCopy = useCallback(() => {
        copy(address);
    }, [address]);

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            p={2}
            bg={bg || themes.color6}
            borderRadius={borderRadius}
            h={'60px'}
            {...containerStyles}
        >
            {controls.includes('qr') && <QRCodePopover address={address} />}
            {controls.includes('icon') && <NetworkIcon networkId={networkId} size={20} />}

            {editLabel && (
                <Box color={themes.color9} textAlign={'left'} flex={'1'}>
                    <Input
                        h={'30px'}
                        border={0}
                        borderRadius={0}
                        lineHeight={1}
                        borderBottom={'1px solid'}
                        type="text"
                        placeholder="Label"
                        value={editLabelText}
                        onChange={handleEditOnChange}
                        onKeyDown={handleInputKeyDown}
                    />
                </Box>
            )}

            {!editLabel && (
                <Box color={themes.color9} textAlign={'left'} flex={'1'}>
                    {label ? (
                        <div>
                            {label} &lt; {address} &gt;
                        </div>
                    ) : (
                        <Box fontSize={12} fontWeight={400} ml={2}>
                            {address}
                        </Box>
                    )}
                </Box>
            )}

            {editLabel ? (
                <Box display={'flex'} alignItems={'center'}>
                    <Button onClick={handleSave} bg={'transparent'} h={'35px'}>
                        Save
                    </Button>
                    <Button onClick={handleCancelOnClick} color={themes.color9} bg={'transparent'} h={'35px'}>
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    {controls.includes('copy') && (
                        <IconButton
                            bg={'transparent'}
                            onClick={handleCopy}
                            aria-label={'copy to clipboard'}
                            icon={<Icon icon="copy" />}
                        />
                    )}
                    {controls.includes('favorite') && (
                        <IconButton
                            bg={'transparent'}
                            onClick={handleFavorite}
                            aria-label={'mark as favorite'}
                            icon={<Icon icon={isFavorite ? 'heart.active' : 'heart'} />}
                        />
                    )}
                    {controls.includes('edit') && (
                        <IconButton
                            bg={'transparent'}
                            onClick={handleEditOnClick}
                            aria-label={'click to edit'}
                            icon={<Icon icon="pencil" />}
                        />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default AddressDisplayPresenter;
