import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button, { Props } from '.';

export default {
    title: 'Atoms/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => <Button {...args} />;
export const TextOnly = Template.bind({});
export const IconOnly = Template.bind({});
export const IconAndText = Template.bind({});

const textOnlyArgs: Props = {
    onClick: () => null,
    text: 'Text Only Button',
    bg: '#4447E2',
    w: '171px',
};
TextOnly.args = textOnlyArgs;

const iconOnlyArgs: Props = {
    onClick: () => null,
    icon: 'heart',
    iconW: '28px',
    iconH: '28px',
};
IconOnly.args = iconOnlyArgs;

const iconAndTextArgs: Props = {
    onClick: () => null,
    icon: 'pencil',
    text: 'Edit',
    iconW: '42px',
    iconH: '26px',
    bg: '#4447E2',
};
IconAndText.args = iconAndTextArgs;
