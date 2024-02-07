import { render, screen } from '@testing-library/react';
import CustomInput from './custom-input';

describe('CustomInput component', () => {
  const defaultProps = {
    type: 'text',
    name: 'inputName',
  };

  it('renders without crashing', () => {
    render(<CustomInput {...defaultProps} />);
  });

  it('renders input element with correct type', () => {
    render(<CustomInput {...defaultProps} />);
    const inputElement = screen.getByRole('textbox', { name: '' });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders input element with correct name', () => {
    render(<CustomInput {...defaultProps} />);
    const inputElement = screen.getByRole('textbox', { name: '' });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('name', 'inputName');
  });

  it('renders input element with placeholder if provided', () => {
    const placeholderText = 'Enter text here';
    render(<CustomInput {...defaultProps} placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  it('renders disabled input element if disabled prop is true', () => {
    render(<CustomInput {...defaultProps} disabled />);
    const inputElement = screen.getByRole('textbox', { name: '' });
    expect(inputElement).toBeDisabled();
  });

  it('renders unchecked checkbox input element if defaultChecked prop is false', () => {
    render(<CustomInput {...defaultProps} type="checkbox" defaultChecked={false} />);
    const inputElement = screen.getByRole('checkbox', { name: '' });
    expect(inputElement).not.toBeChecked();
  });

  it('renders checked checkbox input element if defaultChecked prop is true', () => {
    render(<CustomInput {...defaultProps} type="checkbox" defaultChecked />);
    const inputElement = screen.getByRole('checkbox', { name: '' });
    expect(inputElement).toBeChecked();
  });
});
