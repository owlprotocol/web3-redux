import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

export default {
    title: 'Reactstrap/Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = () => (
    <div className="d-flex justify-content-center p-5">
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
        <Dropdown toggle={function noRefCheck() { }}>
            <DropdownToggle caret>Dropdown</DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
);
export const Primary = Template.bind({});
