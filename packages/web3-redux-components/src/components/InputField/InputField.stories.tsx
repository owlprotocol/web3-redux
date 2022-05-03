import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputField, { Props } from '.';

export default {
    title: 'Atoms/InputField',
    component: InputField,
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args: any) => <InputField {...args} />;
export const Main = Template.bind({});

const args: Props = {
    onChange: () => null,
    placeholder: 'Enter address',
    icon: 'pencil',
    errMsg: 'Invalid string',
};

Main.args = args;
