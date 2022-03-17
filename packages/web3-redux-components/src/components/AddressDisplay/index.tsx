import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Popover, PopoverContent, PopoverTrigger, PopoverBody } from '@chakra-ui/react';
import { ReactComponent as QRIcon } from './assets/qr.svg'
import { ReactComponent as QRHoverIcon } from './assets/qr-hover.svg'
import { ReactComponent as QRSelectedIcon } from './assets/qr-selected.svg'
import { ReactComponent as HeartIcon } from './assets/heart.svg'
import { ReactComponent as PencilIcon } from './assets/pencil.svg'
import { ReactComponent as CopyIcon } from './assets/copy.svg'

const Wrapper = styled.div`
    background: #2C2C30;
    border-radius: 12px;
    height: 60px;
    width: 100%;
    max-width: 560px;
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

const QRbutton = styled.button`
    width: 28px;
    height: 28px;
    margin-right: 16px;
`;

const Address = styled.div`
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #92929D;
    flex: 1;
    display: flex;
    align-items: center;
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

const QRPopup = styled.div`
    background: #1C1C24;
    border-radius: 8px;
    padding: 25px;
    position: relative;
    width: 240px;
    height: 240px;

    > div {
        background: #FFFFFF;
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
`;

export interface Props {
    address: string;
    label: string;
}

const QRCode = () => {
    const [isHovered, setHovered] = useState(false);
    const [isSelected, setSelected] = useState(false);

    return (
        <Popover closeOnBlur={false} onClose={() => setSelected(false)}>
            <PopoverTrigger>
                <QRbutton
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setSelected(true)}>
                    {isSelected ? <QRSelectedIcon /> : (
                        isHovered ? <QRHoverIcon /> : <QRIcon />
                    )}
                </QRbutton>
            </PopoverTrigger>
            <PopoverContent>
                <QRPopup>
                    <PopoverBody>
                        {/* QR HERE */}
                    </PopoverBody>
                </QRPopup>
            </PopoverContent>
        </Popover>
    )
}

const AddressDisplay = ({ address, label }: Props) => {
    const [editLabel, setEditLabel] = useState(false);
    const [_label, setLabel] = useState('');

    useEffect(() => { setLabel(label) }, [label])

    const handleSave = () => {
        setEditLabel(false)
    }

    return (
        <Wrapper>
            <QRCode />
            {editLabel && <input type="text" placeholder="Label" onChange={({target}) => setLabel(target.value)} />}

            {!editLabel &&
                <Address>
                    {_label ? <span>{_label} &lt; {address} &gt;</span> : <span>{address}</span>}
                </Address>}

            {editLabel ?
                <div>
                    <SaveButton onClick={handleSave}>Save</SaveButton>
                    <CancelButton onClick={() => setEditLabel(false)}>Cancel</CancelButton>
                </div>
            :
                <Controls>
                    <button><CopyIcon /></button>
                    <button><HeartIcon /></button>
                    <button onClick={() => setEditLabel(true)}><PencilIcon /></button>
                </Controls>}
        </Wrapper>
    );
}

export default AddressDisplay;
