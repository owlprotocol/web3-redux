import { ComponentStory, ComponentMeta } from '@storybook/react';
import QRCodePopover, { Props } from '.';

const Template: ComponentStory<typeof QRCodePopover> = (args: any) => <QRCodePopover {...args} />;
export const Main = Template.bind({});

const Args: Props = {
    address: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
};

Main.args = Args;
Main.argTypes = {};

export default {
    title: 'Popover/QRCodePopover',
    component: QRCodePopover,
} as ComponentMeta<typeof QRCodePopover>;
