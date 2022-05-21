import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType } from '../../../test/storybookArgs';
import SelectAddress, { Props } from '.';

export default {
    title: 'ContractAbi/SelectAddress',
    component: SelectAddress,
} as ComponentMeta<typeof SelectAddress>;

const Template: ComponentStory<typeof SelectAddress> = (args: Props) => <SelectAddress {...args} />;
export const Main = Template.bind({});
Main.args = {
    networkId: '1',
};
Main.argTypes = {
    networkId: networkIdArgType,
};
