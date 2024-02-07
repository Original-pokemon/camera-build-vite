import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Logo', () => {
  const logoProps = {
    className: 'logo',
    label: 'Logo Label',
    svgSize: { width: 50, height: 50 }
  };

  it('should render correctly', () => {
    render(withHistory(<Logo {...logoProps} />));

    expect(screen.getByLabelText(logoProps.label)).toBeInTheDocument();
  });

  it('renders with correct className and aria-label', () => {
    const { getByLabelText } = render(
      withHistory(<Logo {...logoProps} />)
    );
    const logoElement = getByLabelText(logoProps.label);

    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass(logoProps.className);
  });
  it('renders with correct link destination', () => {
    const { getByLabelText } = render(
      withHistory(<Logo {...logoProps} />)
    );
    const logoLink = getByLabelText(logoProps.label);

    expect(logoLink).toHaveAttribute('href', '/');
  });
});
