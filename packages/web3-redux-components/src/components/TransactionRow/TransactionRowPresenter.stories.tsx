import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addressArgType, transactionHashArgType } from '../../test/storybookArgs';
import { TransactionRowPresenter, PresenterProps } from '.';

const Template: ComponentStory<typeof TransactionRowPresenter> = (args: any) => <TransactionRowPresenter {...args} />;
export const Main = Template.bind({});
const Args: PresenterProps = {
    hash: transactionHashArgType.options[0],
    method: '0x0000',
    blockNumber: 1,
    from: addressArgType.options[0],
    to: addressArgType.options[0],
    value: '1',
    fee: '1',
};
Main.args = Args;
Main.argTypes = {
    hash: transactionHashArgType,
    from: addressArgType,
    to: addressArgType,
};

export default {
    title: 'Transaction/TransactionRowPresenter',
    component: TransactionRowPresenter,
} as ComponentMeta<typeof TransactionRowPresenter>;
