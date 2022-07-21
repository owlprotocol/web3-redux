import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType } from '../../../test/storybookArgs.js';
import SelectAddress, { Props } from '.';

export default {
    title: 'ContractAbi/SelectAddress',
    component: SelectAddress,
} as ComponentMeta<typeof SelectAddress>;

const Template: ComponentStory<typeof SelectAddress> = (args: Props) => <SelectAddress {...args} />;
export const Main = Template.bind({});
Main.args = {
    networkId: '1',
    indexFilter: undefined,
    showOtherAddresses: false,
    creatable: false,
};

Main.argTypes = {
    networkId: networkIdArgType,
    indexFilter: {
        options: ['All', 'Favorites'],
        mapping: {
            All: undefined,
            Favorites: ['Favorites'],
        },
        control: {
            type: 'select',
        },
    },
};
