import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Network } from '@owlprotocol/web3-redux';
import { networkIdArgType, transactionHashArgType } from '../../test/storybookArgs';
import { withMockData } from '../../hoc';
import { TransactionRow, Props } from '.';

const Wrapper = withMockData(TransactionRow, [Network.create({ networkId: '1' })]);
const Template: ComponentStory<typeof TransactionRow> = (args: any) => <Wrapper {...args} />;
export const Main = Template.bind({});
const Args: Props = {
    networkId: networkIdArgType.options[0],
    hash: transactionHashArgType.options[0],
};
Main.args = Args;
Main.argTypes = {
    networkId: networkIdArgType,
    hash: transactionHashArgType,
};

export default {
    title: 'Transaction/TransactionRow',
    component: TransactionRow,
} as ComponentMeta<typeof TransactionRow>;
