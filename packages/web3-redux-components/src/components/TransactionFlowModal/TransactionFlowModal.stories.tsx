import { ComponentStory, ComponentMeta } from '@storybook/react';
import TransactionFlowModal from '.';

export default {
    title: 'Transaction/TransactionFlowModal',
    component: TransactionFlowModal,
} as ComponentMeta<typeof TransactionFlowModal>;

const Template: ComponentStory<typeof TransactionFlowModal> = (args: any) => <TransactionFlowModal {...args} />;
export const Main = Template.bind({});

Main.args = {
    isOpen: true,
    tokenName: 'LINK',
    stage: 1,
};

Main.argTypes = {
    stage: {
        options: [1, 2, 3, 4, 5],
        control: { type: 'select' },
        defaultValue: 1,
    },
};
