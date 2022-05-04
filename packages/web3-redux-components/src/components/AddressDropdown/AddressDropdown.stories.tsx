import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressDropdown from '.';

export default {
    title: 'Address/AddressDropdown',
    component: AddressDropdown,
} as ComponentMeta<typeof AddressDropdown>;

const Template: ComponentStory<typeof AddressDropdown> = (args: any) => <AddressDropdown {...args} />;
export const Main = Template.bind({});

Main.args = {
    address: [
        '0xd4db31e9ee1d853bd3e2da4114df9afad3c78448',
        '0xa28d1d9750ab892d2adcb44d1a0230ea4ff5ed7b',
        '0xa5e2f013605c9cf53264a9ffc82082a61bfabb53',
        '0xeb4c341489129843b325e8e77e05206fcb9df862',
        '0xbeff0b893140322d6ff8a9297686d5bf7bb94dc5',
        '0xeb4c341489129843b325e8e77e05206fcb9df862',
        '0xa28d1d9750ab892d2adcb44d1a0230ea4ff5ed7b',
        '0xbeff0b893140322d6ff8a9297686d5bf7bb94dc5',
        '0xd4db31e9ee1d853bd3e2da4114df9afad3c78448',
        '0xa5e2f013605c9cf53264a9ffc82082a61bfabb53',
    ],
};
