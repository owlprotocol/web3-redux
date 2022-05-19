import { ComponentStory, ComponentMeta } from '@storybook/react';
import TransactionProgressBar, { Props } from '.';

const Template: ComponentStory<typeof TransactionProgressBar> = (args: any) => (
    <div style={{ padding: '30px' }}>
        <TransactionProgressBar {...args} />
    </div>
);
export const Main = Template.bind({});

const Args: Props = {
    stage: 2,
    labels: ['Allow LINK spend', 'Receive allowance confirmation', 'Swap tokens', 'Confirmation'],
    stageError: 2,
};

Main.args = Args;
Main.argTypes = {};

export default {
    title: 'Transaction/TransactionProgressBar',
    component: TransactionProgressBar,
} as ComponentMeta<typeof TransactionProgressBar>;
