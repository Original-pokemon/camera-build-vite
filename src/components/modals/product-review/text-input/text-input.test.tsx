import { render, screen } from '@testing-library/react';
import TextInput from './text-input';
import { withStore } from '../../../../utils/mock-component';
import { generateMockState } from '../../../../utils/mocks';

describe('TextInput component', () => {
  it('renders without errors and displays all elements', () => {
    const { withStoreComponent } = withStore(<TextInput inputLabel="Label" inputPlaceholder="Placeholder" />, generateMockState());

    render(withStoreComponent);

    expect(screen.getByText('Label')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();

    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it('adds is-invalid class if error is present', () => {
    const { withStoreComponent } = withStore(<TextInput inputLabel="Label" inputPlaceholder="Placeholder" error="Error message" />, generateMockState());

    render(withStoreComponent);

    expect(screen.getByTestId('custom-input')).toHaveClass('is-invalid');

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
