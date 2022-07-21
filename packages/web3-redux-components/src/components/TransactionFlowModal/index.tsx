import {
    useDisclosure,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    useTheme,
} from '@chakra-ui/react';
import { ReactComponent as CardIcon } from './assets/card.svg';
import { ReactComponent as InProgressIcon } from './assets/inprog.svg';
import { ReactComponent as ConfirmedIcon } from './assets/confirmed.svg';
import TransactionProgressBar from '../TransactionProgressBar/index.js';

export interface Props {
    isOpen: boolean;
    tokenName: string;
    stage: number;
    actionHandler: any;
}

const StatusIcon = ({ icon }: any) => {
    if (icon === 1 || icon === 2) return <CardIcon style={{ width: '100%', height: '100%' }} />;
    else if (icon === 3 || icon === 4) return <InProgressIcon style={{ width: '100%', height: '100%' }} />;
    else if (icon === 5) return <ConfirmedIcon style={{ width: '100%', height: '100%' }} />;
    else return <InProgressIcon style={{ width: '100%', height: '100%' }} />;
};

const TransactionFlowModal = ({ isOpen, tokenName, stage, actionHandler }: Props) => {
    const { themes } = useTheme();
    const { onClose } = useDisclosure();

    const settings = {
        closeOnEsc: false,
        closeOnOverlayClick: false,
        isOpen: isOpen,
        onClose: onClose,
        isCentered: true,
        size: '2xl',
        autoFocus: false,
        trapFocus: false,
    };

    const buttonText = stage === 5 ? 'View transaction' : 'Next';
    const TXFlowLabels = [`Allow ${tokenName} spend`, 'Receive allowance confirmation', 'Swap tokens', 'Confirmation'];

    return (
        <>
            <Modal {...settings}>
                <ModalOverlay />
                <ModalContent bg={themes.color5} borderRadius={'8px'}>
                    <ModalBody>
                        <Box w={'100%'} maxW={550} h={100} m="12px auto 86px" borderRadius={'8px'}>
                            <TransactionProgressBar stage={stage} labels={TXFlowLabels} />
                        </Box>
                        <Box w="96px" h="72px" margin={'0 auto 24px'}>
                            <StatusIcon icon={stage} />
                        </Box>
                        <Box textStyle="title" mb="12px" textAlign={'center'}>
                            Allow {tokenName} Spend
                        </Box>
                        <Box textStyle="paragraph" mb="12px" textAlign={'center'}>
                            Please confirm the proposed {tokenName} spend allowance in wallet
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button m={'12% auto 12%'} onClick={actionHandler} w="260px" colorScheme="blue">
                            {buttonText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TransactionFlowModal;
