import { ComponentStory, ComponentMeta } from '@storybook/react';
import TransactionRow from '.';

export default {
    title: 'Tables/TransactionRow',
    component: TransactionRow,
} as ComponentMeta<typeof TransactionRow>;

const Template: ComponentStory<typeof TransactionRow> = (args: any) => <TransactionRow {...args} />;
export const Main = Template.bind({});

Main.args = {
    txHash: '0x4bd5480860b3e28391c0506b0e99aae1f5163df5f88db0c80e3b4b567a1caf3f',
    method: 'Approve',
    blockNumber: 14724278,
    age: '3 days 22 hrs ago',
    from: '0x35b051a09ce7136202ed7ad858849f1e0f11ed8d',
    to: 'USDC: USDC Token',
    value: '0 Ether',
    fee: '0.002669500796',
};
