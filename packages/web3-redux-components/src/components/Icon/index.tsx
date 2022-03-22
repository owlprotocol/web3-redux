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

const IconSelect = (icon: string) => {
    switch (icon) {
        case 'BCH':
            return <BCHIcon/>
        case 'BTC':
            return <BTCIcon/>
        case 'DOCE':
            return <DOCEIcon/>
        case 'EOS':
            return <EOSIcon/>
        case 'ETH':
            return <ETHIcon/>
        case 'LTC':
            return <LTCIcon/>
        case 'Split':
            return <SplitIcon/>
        case 'TRX':
            return <TRXIcon/>
        case 'XRP':
            return <XRPIcon/>
        case 'Double':
            return <DoubleIcon/>
        case 'Stand':
            return <StandIcon/>
        case 'Hit':
            return <HitIcon/>
        case 'chevron-up':
            return <ChevronIcon/>
        case 'chevron-down':
            return <ChevronIcon/>
        case 'deposit':
            return <DepositIcon/>
        case 'account':
            return <AccountIcon/>

        case 'three-dots':
            return <ThreeDotsIcon/>
        case 'pallete':
            return <PalleteIcon/>
        case 'notifications':
            return <NotificationsIcon/>
        case 'currencies':
            return <CurrenciesIcon/>
        case 'menu-allgames':
            return <MenuAllGames/>
        case 'menu-coinflip':
            return <MenuCoinFlip/>
        case 'menu-roulette':
            return <MenuRoulette/>
        case 'menu-baccarat':
            return <MenuBaccarat/>
        case 'menu-blackjack':
            return <MenuBlackjack/>
        case 'menu-governance':
            return <MenuGovernance/>

        case 'coinflip':
            return <Coin/>
        case 'avatar':
            return <Avatar/>

        case 'about':
            return <About/>
        case 'docs':
            return <Docs/>
        case 'discord':
            return <Discord/>

        case 'vsign':
            return <VSign/>
        case 'lock':
            return <Lock/>

        case 'game-table':
            return <GameTable/>
        case 'game-coins':
            return <GameCoins/>
        case 'info-icon':
            return <InfoIcon/>

        case 'coin-head':
            return <HeadIcon/>
        case 'coin-tails':
            return <TailsIcon/>
        case 'head-sm':
            return <HeadSmall/>
        case 'tails-sm':
            return <TailsSmall/>
        case 'loader':
            return <Loader/>
        case 'broken-link':
            return <BrokenLink/>

        case 'arrow-positive':
            return <ArrowPositive/>
        case 'arrow-negative':
            return <ArrowNegative/>

        case 'heart':
            return <Heart/>
        case 'heart.active':
            return <HeartActive/>

        default:
            break;
    }
}

const Wrapper = styled.span``;
const Icon = ({ icon, style, className }: any) => {
    const classNames = classnames('icon', icon, className)

    return (
        <Wrapper className={classNames} style={style}>
            {IconSelect(icon)}
        </Wrapper>
    );
}

export default Icon;
