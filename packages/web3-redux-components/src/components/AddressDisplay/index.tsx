import { useEffect, useState } from 'react';
import { useTheme } from '@chakra-ui/react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import QRCodePopover from '../QRCodePopover';
import OwlButton from '../Button';

const Wrapper = styled.div`
    background: #2c2c30;
    border-radius: 12px;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

    svg {
        width: 100%;
        height: 100%;
    }

    input {
        flex: 1;
        background-color: transparent;
        border-bottom: 1px solid #92929d;
        margin-right: 12px;
        color: #92929d;
    }
`;

const Address = styled.div`
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #92929d;
    flex: 1;
    word-break: break-all;
`;

const Controls = styled.div`
    padding-top: 6px;

    button {
        width: 30px;
        height: 30px;
    }
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

const CancelButton = styled.button`
    color: #92929d;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    margin-left: 12px;
`;

export interface Props {
    address: string;
    label: string;
    isFavorite: boolean;
}

const AddressDisplay = ({ address, label, isFavorite }: Props) => {
    const [editLabel, setEditLabel] = useState(false);
    const [_label, setLabel] = useState('');
    const [_isFavorite, setFavorite] = useState(false);

    const theme = useTheme();
    console.log({ theme });

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
        <Wrapper>
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
                <Address>
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
                <div>
                    <SaveButton onClick={handleSave}>Save</SaveButton>
                    <CancelButton onClick={() => setEditLabel(false)}>Cancel</CancelButton>
                </div>
            ) : (
                <Controls>
                    <OwlButton onClick={handleCopy} icon="copy" text="" />
                    <OwlButton onClick={handleFavorite} icon={_isFavorite ? 'heart.active' : 'heart'} text="" />
                    <OwlButton onClick={() => setEditLabel(true)} icon="pencil" text="" />
                </Controls>
            )}
        </Wrapper>
    );
};

export default AddressDisplay;
