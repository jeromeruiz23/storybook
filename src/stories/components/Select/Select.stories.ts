import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Component/Select',
  component: Select,
  parameters: {
    viewMode: 'docs',
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} as Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'A very long option text that should be truncated and show tooltip on hover' },
];

export const SingleSelect: Story = {
  args: {
    options,
    placeholder: 'Select an option',
  },
};

export const MultiSelect: Story = {
  args: {
    options,
    multiple: true,
    placeholder: 'Select multiple options',
  },
};

export const DisabledState: Story = {
  args: {
    options,
    disabled: true,
    placeholder: 'Disabled select',
  },
};
