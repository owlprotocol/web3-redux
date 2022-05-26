import { useEffect, useState } from 'react';
import { useTheme, Box, Button, IconButton, Input } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import Icon from '../Icon';
import QRCodePopover from '../QRCodePopover';

export interface Props {
    address: string;
    label: string;
    isFavorite: boolean;
    borderRadius?: number;
    bg?: string;
}

const AddressDisplay = ({ address, label, isFavorite, borderRadius = 12, bg }: Props) => {
    const theme = useTheme() ?? {};
    console.debug({ theme });

    const [editLabel, setEditLabel] = useState(false);
    const [_label, setLabel] = useState('');
    const [_isFavorite, setFavorite] = useState(false);

    useEffect(() => {
        setLabel(label);
        setFavorite(isFavorite);
    }, [label, isFavorite]);

    const handleInputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    const handleSave = () => {
        setEditLabel(false);
    };

    const handleFavorite = () => {
        setFavorite(!_isFavorite);
    };

    const handleCopy = () => {
        copy(address);
    };

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            p={2}
            bg={bg || theme.color6}
            borderRadius={borderRadius}
            h={'60px'}
        >
            <QRCodePopover address={address} />

            {editLabel && (
                <Box color={theme.color9} textAlign={'left'} flex={'1'}>
                    <Input
                        h={'30px'}
                        border={0}
                        borderRadius={0}
                        lineHeight={1}
                        borderBottom={'1px solid'}
                        type="text"
                        placeholder="Label"
                        value={_label}
                        onChange={({ target }: any) => setLabel(target.value)}
                        onKeyDown={handleInputKeyDown}
                    />
                </Box>
            )}

            {!editLabel && (
                <Box color={theme.color9} textAlign={'left'} flex={'1'}>
                    {_label ? (
                        <div>
                            {_label} &lt; {address} &gt;
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
                    <Button onClick={() => setEditLabel(false)} color={theme.color9} bg={'transparent'} h={'35px'}>
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
                        icon={<Icon icon={_isFavorite ? 'heart.active' : 'heart'} />}
                    />
                    <IconButton
                        bg={'transparent'}
                        onClick={() => setEditLabel(true)}
                        aria-label={'click to edit'}
                        icon={<Icon icon="pencil" />}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AddressDisplay;
