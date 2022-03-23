import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressInput from '.';

export default {
    title: 'Atoms/AddressInput',
    component: AddressInput,
} as ComponentMeta<typeof AddressInput>;

const Template: ComponentStory<typeof AddressInput> = (args: any) => <AddressInput {...args} />;
export const Main = Template.bind({});

Main.args = {};
