import { render, screen } from '@testing-library/react';
import Icon from './icon';

describe('Icon component', () => {
  const defaultProps = {
    icon: '#icon-test',
    svgSize: { width: 20, height: 20 },
    ariaHidden: true,
  };

  const ICON_ID = 'icon';

  it('renders without crashing', () => {
    render(<Icon {...defaultProps} />);
  });

  it('renders correct icon', () => {
    render(<Icon {...defaultProps} />);
    const iconElement = screen.getByTestId(ICON_ID);
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.firstChild).toHaveAttribute('xlink:href', '#icon-test');
  });

  it('renders correct SVG size', () => {
    render(<Icon {...defaultProps} />);
    const iconElement = screen.getByTestId(ICON_ID);
    expect(iconElement).toHaveAttribute('width', '20');
    expect(iconElement).toHaveAttribute('height', '20');
  });

  it('applies correct aria-hidden attribute', () => {
    render(<Icon {...defaultProps} />);
    const iconElement = screen.getByTestId(ICON_ID);
    expect(iconElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const customClassName = 'custom-icon';
    render(<Icon {...defaultProps} className={customClassName} />);
    const iconElement = screen.getByTestId(ICON_ID);
    expect(iconElement).toHaveClass(customClassName);
  });
});
