import { render, screen } from '@testing-library/react';
import NavItem from './nav-item';
import { withHistory } from '../../../../utils/mock-component';

describe('NavItem', () => {
  it('renders a navigation item with correct text and link', () => {
    const link = '/about';
    const text = 'About Us';

    const ComponentWithHistory = withHistory(<NavItem link={link} text={text} />);

    render(ComponentWithHistory);

    const navItem = screen.getByRole('listitem');
    expect(navItem).toBeInTheDocument();

    const navLink = screen.getByRole('link');
    expect(navLink).toHaveAttribute('href', link);
  });
});
