import { ComponentStory, ComponentMeta } from '@storybook/react';
import TransactionsTable, { Props } from '.';

export default {
    title: 'Tables/TransactionsTable',
    component: TransactionsTable,
} as ComponentMeta<typeof TransactionsTable>;

const Template: ComponentStory<typeof TransactionsTable> = (args: any) => <TransactionsTable {...args} />;
export const Main = Template.bind({});

const DEF = {
    txHash: '0xe7f8f22...',
    method: 'Approve',
    blockNumber: 14724278,
    age: '3 days 22 hrs ago',
    from: '0x35b0d11...',
    to: 'USDC: USDC Token',
    value: '0 Ether',
    fee: '0.002669500796',
};

// @ts-ignore
const mainArgs: Props = {
    items: [DEF, DEF, DEF, DEF, DEF],
};

// @ts-ignore
Main.args = mainArgs;
