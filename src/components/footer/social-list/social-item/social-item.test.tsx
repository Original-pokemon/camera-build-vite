import { render, screen } from '@testing-library/react';
import SocialItem from './social-item';

describe('SocialItem', () => {
  it('renders correctly with given icon, label, and href', () => {
    const icon = {
      type: '#icon-facebook',
      size: { width: 24, height: 24 },
    };
    const label = 'Facebook';
    const href = 'https://www.facebook.com/';

    render(<SocialItem icon={icon} label={label} href={href} />);

    const linkElement = screen.getByRole('link', { name: label });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', href);
  });
});
