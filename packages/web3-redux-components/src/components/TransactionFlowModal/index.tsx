import {
    useDisclosure,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { ReactComponent as CardIcon } from './assets/card.svg';
import { ReactComponent as InProgressIcon } from './assets/inprog.svg';
import { ReactComponent as ConfirmedIcon } from './assets/confirmed.svg';

const ProgBarDummy = styled.div`
    width: 100%;
    height: 100px;
    background-color: #eee;
    border-radius: 8px;
    margin: 12px auto 96px;
`;

export interface Props {
    isOpen: boolean;
    title: string;
    stage: number;
}

const StatusIcon = ({ icon }: any) => {
    if (icon === 1 || icon === 2) return <CardIcon style={{ width: '100%', height: '100%' }} />;
    else if (icon === 3 || icon === 4) return <InProgressIcon style={{ width: '100%', height: '100%' }} />;
    else if (icon === 5) return <ConfirmedIcon style={{ width: '100%', height: '100%' }} />;
    else return <InProgressIcon style={{ width: '100%', height: '100%' }} />;
};

const TransactionFlowModal = ({ isOpen, title, stage }: Props) => {
    const { onClose } = useDisclosure();
    const settings = {
        closeOnEsc: false,
        closeOnOverlayClick: false,
        isOpen: isOpen,
        onClose: onClose,
        isCentered: true,
        size: 'xl',
        autoFocus: false,
    };

    const buttonText = stage === 5 ? 'View transaction' : 'Next';

    return (
        <>
            <Modal {...settings}>
                <ModalOverlay />
                <ModalContent bg="#1C1C24" borderRadius={'8px'}>
                    <ModalBody>
                        <ProgBarDummy />
                        <Box w="96px" h="72px" margin={'0 auto 24px'}>
                            <StatusIcon icon={stage} />
                        </Box>
                        <Box textStyle="title" mb="12px" textAlign={'center'}>
                            {title}
                        </Box>
                        <Box textStyle="paragraph" mb="12px" textAlign={'center'}>
                            Please confirm the proposed LINK spend allowance in wallet
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button m={'12% auto 12%'} onClick={onClose} w="260px" colorScheme="blue">
                            {buttonText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TransactionFlowModal;
