import { useCallback, useEffect, useState } from 'react';
import { useTheme, Box, Button, IconButton, Input } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import Icon from '../Icon';
import QRCodePopover from '../QRCodePopover';

export interface Props {
    address: string;
    label?: string;
    isFavorite: boolean;
    borderRadius?: number;
    bg?: string;
    setFavorite?: (v: boolean) => void;
    setLabel?: (v: string) => void;
}

export const AddressDisplayPresenter = ({
    address,
    label,
    isFavorite,
    borderRadius = 12,
    bg,
    setFavorite = (v) => console.log(`setFavorite(${v})`),
    setLabel = (v) => console.log(`setLabel(${v})`),
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
        >
            <QRCodePopover address={address} />

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
                        <div>{address}</div>
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
                    <IconButton
                        bg={'transparent'}
                        onClick={handleCopy}
                        aria-label={'copy to clipboard'}
                        icon={<Icon icon="copy" />}
                    />
                    <IconButton
                        bg={'transparent'}
                        onClick={handleFavorite}
                        aria-label={'mark as favorite'}
                        icon={<Icon icon={isFavorite ? 'heart.active' : 'heart'} />}
                    />
                    <IconButton
                        bg={'transparent'}
                        onClick={handleEditOnClick}
                        aria-label={'click to edit'}
                        icon={<Icon icon="pencil" />}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AddressDisplayPresenter;
