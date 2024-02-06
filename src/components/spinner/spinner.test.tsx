import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
  });

  it('should render correct', () => {

    render(<Spinner />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
