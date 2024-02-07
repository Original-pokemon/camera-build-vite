import { render, screen } from '@testing-library/react';
import FooterNavItem from './footer-nav-item';

describe('FooterNavItem component', () => {
  it('renders correctly with given title and items', () => {
    const title = 'Footer Nav Item';
    const items = [
      { link: '/home', text: 'Home' },
      { link: '/about', text: 'About Us' },
      { link: '/contact', text: 'Contact Us' },
    ];

    render(<FooterNavItem title={title} items={items} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    items.forEach(({ link, text }) => {
      const linkElement = screen.getByText(text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link);
    });
  });
});
