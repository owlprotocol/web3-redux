import { useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import { ReactComponent as VSignIcon } from './assets/flowvsign.svg';
import { ReactComponent as ErrorIcon } from './assets/flowerrsign.svg';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StageWrapper: any = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    > div:first-of-type {
        border-color: ${(props: any) => (props.isActive ? props.color6 : props.color1)};
        color: ${(props: any) => (props.isActive ? props.color6 : props.color1)};
        border: 1px solid;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        border-radius: 50%;
        position: relative;
    }

    &.has-error > div {
        color: rgba(255, 4, 32, 0.6);
        border-color: rgba(255, 4, 32, 0.6);
    }
`;

const LineSaparator: any = styled.div`
    background: ${(props: any) => (props.isAltColor ? props.color6 : props.color1)};
    width: 160px;
    height: 2px;
    flex: 1;
`;

const StageLabel: any = styled.div`
    color: ${(props: any) => (props.isAltColor ? props.color8 : props.color1)};
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 20px 0;
    margin: -22px 0;
    width: 120px;
    height: 80px;
    position: absolute;
    bottom: -55px;
    z-index: 1;
    text-align: center;
    overflow: hidden;
`;

export interface Props {
    stage: number;
    labels: string[];
    stageError?: number;
}

const DEFAULT_LABELS = ['', '', '', ''];

// @ts-ignore
const TransactionProgressBar = ({ stage, labels = DEFAULT_LABELS, stageError }: Props) => {
    const { themes } = useTheme();

    return (
        <Wrapper>
            {[...Array(4)].map((x, idx) => (
                <>
                    <StageWrapper
                        color6={themes.color6}
                        color1={themes.color1}
                        isActive={stage < idx + 1}
                        className={classNames({ 'has-error': stageError === idx + 1 })}
                    >
                        <div>{stageError === idx + 1 ? <ErrorIcon /> : stage < idx + 1 ? idx + 1 : <VSignIcon />}</div>
                        <StageLabel color8={themes.color8} color1={themes.color1} isAltColor={stage < idx + 1}>
                            {labels[idx]}
                        </StageLabel>
                    </StageWrapper>
                    {idx !== 3 && (
                        <LineSaparator color6={themes.color6} color1={themes.color1} isAltColor={stage <= idx + 1} />
                    )}
                </>
            ))}
        </Wrapper>
    );
};

export default TransactionProgressBar;
