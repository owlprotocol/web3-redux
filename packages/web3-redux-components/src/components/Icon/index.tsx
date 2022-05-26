import { Box } from '@chakra-ui/react';
import classnames from 'classnames';

// Tokens
import { ReactComponent as BCHIcon } from './tokens/BCHIcon.svg';
import { ReactComponent as BTCIcon } from './tokens/BTCIcon.svg';
import { ReactComponent as DOCEIcon } from './tokens/DOCEIcon.svg';
import { ReactComponent as EOSIcon } from './tokens/EOSIcon.svg';
import { ReactComponent as ETHIcon } from './tokens/ETHIcon.svg';
import { ReactComponent as LTCIcon } from './tokens/LTCIcon.svg';
import { ReactComponent as TRXIcon } from './tokens/TRXIcon.svg';
import { ReactComponent as XRPIcon } from './tokens/XRPIcon.svg';

// Coin Flip
import { ReactComponent as Coin } from './general/Coin.svg';
import { ReactComponent as HeadIcon } from './general/HeadIcon.svg';
import { ReactComponent as TailsIcon } from './general/TailsIcon.svg';
import { ReactComponent as TailsSmall } from './general/TailsSmall.svg';
import { ReactComponent as HeadSmall } from './general/HeadSmall.svg';

// Game Actions
import { ReactComponent as DoubleIcon } from './general/DoubleIcon.svg';
import { ReactComponent as SplitIcon } from './general/SplitIcon.svg';
import { ReactComponent as StandIcon } from './general/StandIcon.svg';
import { ReactComponent as HitIcon } from './general/HitIcon.svg';

import { ReactComponent as ChevronIcon } from './general/ChevronIcon.svg';
import { ReactComponent as DepositIcon } from './general/DepositIcon.svg';
import { ReactComponent as AccountIcon } from './general/AccountIcon.svg';

// Navigation Icons
import { ReactComponent as MenuAllGames } from './nav/MenuAllGames.svg';
import { ReactComponent as MenuCoinFlip } from './nav/MenuCoinFlip.svg';
import { ReactComponent as MenuRoulette } from './nav/MenuRoulette.svg';
import { ReactComponent as MenuBaccarat } from './nav/MenuBaccarat.svg';
import { ReactComponent as MenuBlackjack } from './nav/MenuBlackjack.svg';
import { ReactComponent as MenuGovernance } from './nav/MenuGovernance.svg';

// Header Actions
import { ReactComponent as ThreeDotsIcon } from './general/ThreeDotsIcon.svg';
import { ReactComponent as PalleteIcon } from './general/PalleteIcon.svg';
import { ReactComponent as NotificationsIcon } from './general/NotificationsIcon.svg';
import { ReactComponent as CurrenciesIcon } from './general/CurrenciesIcon.svg';

// General Icons
import { ReactComponent as Avatar } from './general/Avatar.svg';
import { ReactComponent as About } from './general/About.svg';
import { ReactComponent as Docs } from './general/Docs.svg';
import { ReactComponent as Discord } from './general/Discord.svg';
import { ReactComponent as VSign } from './general/VSign.svg';
import { ReactComponent as Lock } from './general/Lock.svg';
import { ReactComponent as GameTable } from './general/GameTable.svg';
import { ReactComponent as GameCoins } from './general/GameCoins.svg';
import { ReactComponent as InfoIcon } from './general/InfoIcon.svg';
import { ReactComponent as Loader } from './general/Loader.svg';
import { ReactComponent as BrokenLink } from './general/BrokenLink.svg';
import { ReactComponent as ArrowPositive } from './general/ArrowPositive.svg';
import { ReactComponent as ArrowNegative } from './general/ArrowNegative.svg';
import { ReactComponent as QR } from './general/QR.svg';
import { ReactComponent as QRHover } from './general/QR.hover.svg';
import { ReactComponent as QRSelected } from './general/QR.selected.svg';

// Functional Icons
import { ReactComponent as Heart } from './functions/Heart.svg';
import { ReactComponent as HeartActive } from './functions/Heart.active.svg';
import { ReactComponent as Copy } from './functions/copy.svg';
import { ReactComponent as Pencil } from './functions/pencil.svg';
import { ReactComponent as Search } from './functions/search.svg';

// Signs
import { ReactComponent as ExclamationMark } from './signs/ExclamationMark.svg';
import { ReactComponent as FlowCheckMark } from './signs/FlowCheckMark.svg';

// @ts-ignore
export const ICONS = {
    BCH: <BCHIcon />,
    BTC: <BTCIcon />,
    DOCE: <DOCEIcon />,
    EOS: <EOSIcon />,
    ETH: <ETHIcon />,
    LTC: <LTCIcon />,
    Split: <SplitIcon />,
    TRX: <TRXIcon />,
    XRP: <XRPIcon />,
    Double: <DoubleIcon />,
    Stand: <StandIcon />,
    Hit: <HitIcon />,
    'chevron-up': <ChevronIcon />,
    'chevron-down': <ChevronIcon />,
    deposit: <DepositIcon />,
    account: <AccountIcon />,
    'three-dots': <ThreeDotsIcon />,
    pallete: <PalleteIcon />,
    notifications: <NotificationsIcon />,
    currencies: <CurrenciesIcon />,
    'menu-allgames': <MenuAllGames />,
    'menu-coinflip': <MenuCoinFlip />,
    'menu-roulette': <MenuRoulette />,
    'menu-baccarat': <MenuBaccarat />,
    'menu-blackjack': <MenuBlackjack />,
    'menu-governance': <MenuGovernance />,
    coinflip: <Coin />,
    avatar: <Avatar />,
    about: <About />,
    docs: <Docs />,
    discord: <Discord />,
    vsign: <VSign />,
    lock: <Lock />,
    'game-table': <GameTable />,
    'game-coins': <GameCoins />,
    'info-icon': <InfoIcon />,
    'coin-head': <HeadIcon />,
    'coin-tails': <TailsIcon />,
    'head-sm': <HeadSmall />,
    'tails-sm': <TailsSmall />,
    loader: <Loader />,
    'broken-link': <BrokenLink />,
    'arrow-positive': <ArrowPositive />,
    'arrow-negative': <ArrowNegative />,
    heart: <Heart />,
    'heart.active': <HeartActive />,
    copy: <Copy />,
    pencil: <Pencil />,
    search: <Search />,
    ExclamationMark: <ExclamationMark />,
    FlowCheckMark: <FlowCheckMark />,
    QR: <QR />,
    QRHover: <QRHover />,
    QRSelected: <QRSelected />,
};

// @ts-ignore
const IconSelect = (icon: string | undefined) => ICONS[icon || 'ETH'];

export interface Props {
    icon: string | undefined;
    size?: number | undefined;
    className?: string;
    transform?: string;
    mr?: number;
}
const Icon = ({ icon, size = 23, className, transform = '', mr }: Props) => {
    const classNames = classnames('icon', icon, className);

    return (
        <Box boxSize={`${size}px`} className={classNames} transform={transform} mr={mr}>
            {IconSelect(icon)}
        </Box>
    );
};

export default Icon;
