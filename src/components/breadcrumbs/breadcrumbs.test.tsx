import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Breadcrumbs from './breadcrumbs';

describe('Breadcrumbs', () => {
  const breadcrumbs = [
    { link: '/home', text: 'Home' },
    { link: '/products', text: 'Products' },
    { link: '/products/cameras', text: 'Cameras' },
    { link: '/products/cameras/digital', text: 'Digital Cameras' },
  ];

  const breadcrumbsComponent = withHistory(
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );

  it('renders last breadcrumb as active link', () => {
    render(breadcrumbsComponent);

    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    const activeBreadcrumbElement = screen.getByText(lastBreadcrumb.text);
    expect(activeBreadcrumbElement).toHaveClass('breadcrumbs__link--active');
    expect(activeBreadcrumbElement.tagName).toBe('SPAN');
  });

  it('renders correct number of breadcrumbs', () => {
    render(breadcrumbsComponent);

    const breadcrumbElements = screen.getAllByTestId('breadcrumb');
    expect(breadcrumbElements.length).toBe(breadcrumbs.length);
  });
});
