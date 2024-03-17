import { render, screen } from '@testing-library/react';
import FilterItem from './filter-item';

describe('FilterItem component', () => {
  const defaultProps = {
    name: 'filterName',
    label: 'Filter Label',
    disabled: false,
  };

  it('renders without crashing', () => {
    render(<FilterItem {...defaultProps} />);
  });

  it('renders correct label', () => {
    render(<FilterItem {...defaultProps} />);
    const labelElement = screen.getByText('Filter Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders checkbox input with correct attributes', () => {
    render(<FilterItem {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveAttribute('type', 'checkbox');
    expect(checkboxElement).toHaveAttribute('name', 'filterName');
    expect(checkboxElement).not.toBeChecked();
    expect(checkboxElement).not.toBeDisabled();
  });

  it('renders checkbox input with checked attribute when provided', () => {
    render(<FilterItem {...defaultProps} checked />);
    const checkboxElement = screen.getByRole('checkbox');

    expect(checkboxElement).toBeChecked();
  });

  it('renders checkbox input with disabled attribute when provided', () => {
    render(<FilterItem {...defaultProps} disabled />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeDisabled();
  });
});
