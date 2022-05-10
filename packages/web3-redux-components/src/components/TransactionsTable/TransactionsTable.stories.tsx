import { ComponentStory, ComponentMeta } from '@storybook/react';
import TransactionsTable, { Props } from '.';

export default {
    title: 'Tables/TransactionsTable',
    component: TransactionsTable,
} as ComponentMeta<typeof TransactionsTable>;

const Template: ComponentStory<typeof TransactionsTable> = (args: any) => <TransactionsTable {...args} />;
export const Main = Template.bind({});

// @ts-ignore
const mainArgs: Props = [];

// @ts-ignore
Main.args = mainArgs;
