import { render, screen } from '@testing-library/react';
import NavList from './nav-list';
import { withHistory } from '../../../utils/mock-component';

describe('NavList', () => {
  it('renders a list of navigation items with correct texts and links', () => {
    const items = [
      { link: '/home', text: 'Home' },
      { link: '/about', text: 'About' },
      { link: '/contact', text: 'Contact' },
    ];

    const componentWithHistory = withHistory(<NavList items={items} />);

    render(componentWithHistory);

    expect(screen.getByTestId('nav-list')).toBeInTheDocument();
  });
});
