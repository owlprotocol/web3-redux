import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType, addressArgType } from '../../test/storybookArgs';
import { TransactionsTable } from '.';

export default {
    title: 'Transaction/TransactionsTable',
    component: TransactionsTable,
    args: {
        networkId: networkIdArgType.options[0],
        address: addressArgType.options[0],
    },
    argTypes: {
        networkId: networkIdArgType,
        address: addressArgType,
    },
} as ComponentMeta<typeof TransactionsTable>;

const Template: ComponentStory<typeof TransactionsTable> = (args: any) => <TransactionsTable {...args} />;
export const Main = Template.bind({});
