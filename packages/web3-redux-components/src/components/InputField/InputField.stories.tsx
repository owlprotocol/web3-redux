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
    hasError: false,
    icon: 'pencil',
};

Main.args = args;
