import { render, screen } from '@testing-library/react';
import CustomInput from './custom-input';
import userEvent from '@testing-library/user-event';

describe('CustomInput component', () => {
  const defaultProps = {
    type: 'text',
    name: 'inputName',
    defaultValue: 'testValue',
    testId: 'input',

  };

  it('renders without crashing', () => {
    render(<CustomInput {...defaultProps} />);
  });

  it('renders input element with correct type', () => {
    render(<CustomInput {...defaultProps} />);

    const inputElement = screen.getByTestId('input');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders input element with correct name', () => {
    render(<CustomInput {...defaultProps} />);

    const inputElement = screen.getByTestId('input');

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

    const inputElement = screen.getByTestId('input');

    expect(inputElement).toBeDisabled();
  });

  it('input text is displayed correctly', async () => {
    render(<CustomInput {...defaultProps} type='number' />);

    const inputElement = screen.getByTestId('input');

    await userEvent.type(inputElement, '128');

    expect(inputElement).toHaveValue(128);
    expect(screen.getByDisplayValue('128')).toBeInTheDocument();
  });
});

