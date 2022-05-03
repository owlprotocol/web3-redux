import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputField, { Props } from '.';

export default {
    title: 'Atoms/InputField',
    component: InputField,
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args: any) => <InputField {...args} />;
export const Main = Template.bind({});
export const WithIcon = Template.bind({});
export const WithError = Template.bind({});

const mainArgs: Props = {
    onChange: () => null,
    placeholder: 'Enter address',
};
Main.args = mainArgs;

const withIconArgs: Props = {
    onChange: () => null,
    placeholder: 'Enter address',
    icon: 'pencil',
};
WithIcon.args = withIconArgs;

const withErrorArgs: Props = {
    onChange: () => null,
    placeholder: 'Enter address',
    errMsg: 'The address is invalid.',
};
WithError.args = withErrorArgs;
