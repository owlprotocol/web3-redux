import styled from 'styled-components';
import classnames from 'classnames';

// Tokens
import { ReactComponent as BCHIcon } from './tokens/BCHIcon.svg'
import { ReactComponent as BTCIcon } from './tokens/BTCIcon.svg'
import { ReactComponent as DOCEIcon } from './tokens/DOCEIcon.svg'
import { ReactComponent as EOSIcon } from './tokens/EOSIcon.svg'
import { ReactComponent as ETHIcon } from './tokens/ETHIcon.svg'
import { ReactComponent as LTCIcon } from './tokens/LTCIcon.svg'
import { ReactComponent as TRXIcon } from './tokens/TRXIcon.svg'
import { ReactComponent as XRPIcon } from './tokens/XRPIcon.svg'

// Coin Flip
import { ReactComponent as Coin } from './assets/Coin.svg'
import { ReactComponent as HeadIcon } from './assets/HeadIcon.svg'
import { ReactComponent as TailsIcon } from './assets/TailsIcon.svg'
import { ReactComponent as TailsSmall } from './assets/TailsSmall.svg'
import { ReactComponent as HeadSmall } from './assets/HeadSmall.svg'

// Game Actions
import { ReactComponent as DoubleIcon } from './assets/DoubleIcon.svg'
import { ReactComponent as SplitIcon } from './assets/SplitIcon.svg'
import { ReactComponent as StandIcon } from './assets/StandIcon.svg'
import { ReactComponent as HitIcon } from './assets/HitIcon.svg'

import { ReactComponent as ChevronIcon } from './assets/ChevronIcon.svg'
import { ReactComponent as DepositIcon } from './assets/DepositIcon.svg'
import { ReactComponent as AccountIcon } from './assets/AccountIcon.svg'

// Navigation Icons
import { ReactComponent as MenuAllGames } from './nav/MenuAllGames.svg'
import { ReactComponent as MenuCoinFlip } from './nav/MenuCoinFlip.svg'
import { ReactComponent as MenuRoulette } from './nav/MenuRoulette.svg'
import { ReactComponent as MenuBaccarat } from './nav/MenuBaccarat.svg'
import { ReactComponent as MenuBlackjack } from './nav/MenuBlackjack.svg'
import { ReactComponent as MenuGovernance } from './nav/MenuGovernance.svg'

// Header Actions
import { ReactComponent as ThreeDotsIcon } from './assets/ThreeDotsIcon.svg'
import { ReactComponent as PalleteIcon } from './assets/PalleteIcon.svg'
import { ReactComponent as NotificationsIcon } from './assets/NotificationsIcon.svg'
import { ReactComponent as CurrenciesIcon } from './assets/CurrenciesIcon.svg'

import { ReactComponent as Avatar } from './assets/Avatar.svg'
import { ReactComponent as About } from './assets/About.svg'
import { ReactComponent as Docs } from './assets/Docs.svg'
import { ReactComponent as Discord } from './assets/Discord.svg'
import { ReactComponent as VSign } from './assets/VSign.svg'
import { ReactComponent as Lock } from './assets/Lock.svg'
import { ReactComponent as GameTable } from './assets/GameTable.svg'
import { ReactComponent as GameCoins } from './assets/GameCoins.svg'
import { ReactComponent as InfoIcon } from './assets/InfoIcon.svg'
import { ReactComponent as Loader } from './assets/Loader.svg'
import { ReactComponent as BrokenLink } from './assets/BrokenLink.svg'

import { ReactComponent as ArrowPositive } from './assets/ArrowPositive.svg'
import { ReactComponent as ArrowNegative } from './assets/ArrowNegative.svg'

import { ReactComponent as Heart } from './functions/Heart.svg'
import { ReactComponent as HeartActive } from './functions/Heart.active.svg'

// @ts-ignore
export const ICONS = {
    'BCH': <BCHIcon />,
    'BTC': <BTCIcon />,
    'DOCE': <DOCEIcon />,
    'EOS': <EOSIcon />,
    'ETH': <ETHIcon />,
    'LTC': <LTCIcon />,
    'Split': <SplitIcon />,
    'TRX': <TRXIcon />,
    'XRP': <XRPIcon />,
    'Double': <DoubleIcon />,
    'Stand': <StandIcon />,
    'Hit': <HitIcon />,
    'chevron-up': <ChevronIcon />,
    'chevron-down': <ChevronIcon />,
    'deposit': <DepositIcon />,
    'account': <AccountIcon />,
    'three-dots': <ThreeDotsIcon />,
    'pallete': <PalleteIcon />,
    'notifications': <NotificationsIcon />,
    'currencies': <CurrenciesIcon />,
    'menu-allgames': <MenuAllGames />,
    'menu-coinflip': <MenuCoinFlip />,
    'menu-roulette': <MenuRoulette />,
    'menu-baccarat': <MenuBaccarat />,
    'menu-blackjack': <MenuBlackjack />,
    'menu-governance': <MenuGovernance />,
    'coinflip': <Coin />,
    'avatar': <Avatar />,
    'about': <About />,
    'docs': <Docs />,
    'discord': <Discord />,
    'vsign': <VSign />,
    'lock': <Lock />,
    'game-table': <GameTable />,
    'game-coins': <GameCoins />,
    'info-icon': <InfoIcon />,
    'coin-head': <HeadIcon />,
    'coin-tails': <TailsIcon />,
    'head-sm': <HeadSmall />,
    'tails-sm': <TailsSmall />,
    'loader': <Loader />,
    'broken-link': <BrokenLink />,
    'arrow-positive': <ArrowPositive />,
    'arrow-negative': <ArrowNegative />,
    'heart': <Heart />,
    'heart.active': <HeartActive />,
};

// @ts-ignore
const IconSelect = (icon: string) => ICONS[icon];

const Wrapper = styled.div`
    display: inline-block;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Icon = ({ icon, style, className }: any) => {
    const classNames = classnames('icon', icon, className)

    return (
        <Wrapper className={classNames} style={style}>
            {IconSelect(icon)}
        </Wrapper>
    );
}

export default Icon;
