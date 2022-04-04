import { ComponentStory, ComponentMeta } from '@storybook/react';
import TransactionFlowModel, { Props } from '.';

const Template: ComponentStory<typeof TransactionFlowModel> = (args: any) => (
    <div style={{ padding: '30px' }}>
        <TransactionFlowModel {...args} />
    </div>
);
export const Main = Template.bind({});

const Args: Props = {
    stage: 1,
    labels: ['Allow LINK spend    ', 'Receive allowance confirmation    ', 'Swap tokens    ', 'Confirmation'],
    stageError: 1,
};

Main.args = Args;
Main.argTypes = {};

export default {
    title: 'TransactionFlowModel/TransactionFlowModel',
    component: TransactionFlowModel,
} as ComponentMeta<typeof TransactionFlowModel>;
