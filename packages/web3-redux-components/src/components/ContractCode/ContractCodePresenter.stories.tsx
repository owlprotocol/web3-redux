import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContractCodePresenter, PresenterProps } from '.';

const Template: ComponentStory<typeof ContractCodePresenter> = (args: any) => <ContractCodePresenter {...args} />;
export const Main = Template.bind({});
const Args: PresenterProps = {
    bytecode: '0xff01024812309098a6ef98a6f896b89fea69bf6ae0bf89',
};
Main.args = Args;

export default {
    title: 'Contract/ContractCodePresenter',
    component: ContractCodePresenter,
} as ComponentMeta<typeof ContractCodePresenter>;
