import { render, screen } from '@testing-library/react';
import SocialList from './social-list';

describe('SocialList', () => {
  it('renders social items correctly', () => {
    const socialItems = [
      {
        icon: { type: '#icon-facebook', size: { width: 24, height: 24 } },
        label: 'Facebook',
        href: 'https://www.facebook.com/',
      },
      {
        icon: { type: '#icon-twitter', size: { width: 24, height: 24 } },
        label: 'Twitter',
        href: 'https://twitter.com/',
      },
    ];

    render(<SocialList socialItems={socialItems} />);

    const socialListElement = screen.getByRole('list');
    expect(socialListElement).toBeInTheDocument();

    const socialItemElements = screen.getAllByRole('listitem');
    expect(socialItemElements).toHaveLength(socialItems.length);
  });
});
