import { useEffect, useState } from 'react';
import { useTheme } from '@chakra-ui/react'
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import QRCodePopover from '../QRCodePopover';
import { ReactComponent as HeartIcon } from './assets/heart.svg'
import { ReactComponent as HeartActiveIcon } from './assets/heart-active.svg'
import { ReactComponent as PencilIcon } from './assets/pencil.svg'
import { ReactComponent as CopyIcon } from './assets/copy.svg'

const Wrapper = styled.div`
    background: #2C2C30;
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
        border-bottom: 1px solid #92929D;
        margin-right: 12px;
        color: #92929D;
    }
`;

const Address = styled.div`
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #92929D;
    flex: 1;
    word-break: break-all;
`;

const Controls = styled.div`
    padding-top: 6px;

    button {
        width: 22px;
        height: 22px;
        margin-left: 18px;
    }
`;

const SaveButton = styled.button`
    background: rgba(0, 102, 255, 0.16);
    border-radius: 28px;
    color: #0066FF;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    height: 24px;
    width: 79px;
    text-align: center;
`;

const CancelButton = styled.button`
    color: #92929D;
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
    console.log({theme});


    useEffect(() => {
        setLabel(label)
        setFavorite(isFavorite)
    }, [label, isFavorite])

    const handleInputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    const handleSave = () => {
        setEditLabel(false)
    }

    const handleFavorite = () => {
        setFavorite(!_isFavorite)
    }

    const handleCopy = () => {
        copy(address);
    }

    return (
        <Wrapper>
            <QRCodePopover address={address} />

            {editLabel &&
                <input type="text" placeholder="Label" onChange={({target}) => setLabel(target.value)}
                    onKeyDown={handleInputKeyDown} />}

            {!editLabel &&
                <Address>
                    {_label
                        ? <div>
                            {_label} &lt; {address} &gt;
                        </div>
                        : <div>{address}</div>}
                </Address>}

            {editLabel ?
                <div>
                    <SaveButton onClick={handleSave}>Save</SaveButton>
                    <CancelButton onClick={() => setEditLabel(false)}>Cancel</CancelButton>
                </div>
            :
                <Controls>
                    <button onClick={handleCopy}><CopyIcon /></button>
                    <button onClick={handleFavorite}>
                        {_isFavorite ? <HeartActiveIcon /> : <HeartIcon />}
                    </button>
                    <button onClick={() => setEditLabel(true)}><PencilIcon /></button>
                </Controls>}
        </Wrapper>
    );
}

export default AddressDisplay;
