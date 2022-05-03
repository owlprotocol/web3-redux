import { useEffect, useState } from 'react';
import { useTheme, Box } from '@chakra-ui/react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import QRCodePopover from '../QRCodePopover';
import OwlButton from '../Button';

const Wrapper: any = styled.div`
    background: ${(props: any) => props.color6};
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: ${(props: any) => `${props.borderRadius}px`};

    svg {
        width: 100%;
        height: 100%;
    }

    input {
        flex: 1;
        background-color: transparent;
        border-bottom: 1px solid;
        border-color: ${(props: any) => props.color9};
        margin-right: 12px;
        color: ${(props: any) => props.color9};
    }
`;

const Address: any = styled.div`
    height: 24px;
    line-height: 24px;
    font-weight: 600;
    font-size: 14px;
    color: ${(props: any) => props.color9};
    flex: 1;
    word-break: break-all;
    overflow: hidden;
`;

const SaveButton = styled.button`
    background: rgba(0, 102, 255, 0.16);
    border-radius: 28px;
    color: #0066ff;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    height: 24px;
    width: 79px;
    text-align: center;
`;

const CancelButton: any = styled.button`
    color: ${(props: any) => props.color9};
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    margin-left: 12px;
`;

export interface Props {
    address: string;
    label: string;
    isFavorite: boolean;
    borderRadius?: number;
}

const AddressDisplay = ({ address, label, isFavorite, borderRadius = 12 }: Props) => {
    const { themes } = useTheme();

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
        <Wrapper color6={themes.color6} color9={themes.color9} borderRadius={borderRadius}>
            <QRCodePopover address={address} />

            {editLabel && (
                <input
                    type="text"
                    placeholder="Label"
                    onChange={({ target }) => setLabel(target.value)}
                    onKeyDown={handleInputKeyDown}
                />
            )}

            {!editLabel && (
                <Address color9={themes.color9}>
                    {_label ? (
                        <div>
                            {_label} &lt; {address} &gt;
                        </div>
                    ) : (
                        <div>{address}</div>
                    )}
                </Address>
            )}

            {editLabel ? (
                <Box display={'flex'} alignItems={'center'}>
                    <SaveButton onClick={handleSave}>Save</SaveButton>
                    <CancelButton onClick={() => setEditLabel(false)} color9={themes.color9}>
                        Cancel
                    </CancelButton>
                </Box>
            ) : (
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} w={'70px'}>
                    <OwlButton onClick={handleCopy} icon="copy" text="" />
                    <OwlButton onClick={handleFavorite} icon={_isFavorite ? 'heart.active' : 'heart'} text="" />
                    <OwlButton onClick={() => setEditLabel(true)} icon="pencil" text="" />
                </Box>
            )}
        </Wrapper>
    );
};

export default AddressDisplay;
