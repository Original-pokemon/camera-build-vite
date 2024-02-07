import { render, screen } from '@testing-library/react';
import CatalogFilterBlock from './catalog-filter-block';

describe('CatalogFilterBlock component', () => {
  const defaultProps = {
    legend: 'Filter Legend',
    children: <div>Filter Content</div>,
  };

  it('renders without crashing', () => {
    render(<CatalogFilterBlock {...defaultProps} />);
  });

  it('renders correct legend', () => {
    render(<CatalogFilterBlock {...defaultProps} />);
    const legendElement = screen.getByText('Filter Legend');
    expect(legendElement).toBeInTheDocument();
    expect(legendElement.tagName).toBe('LEGEND');
    expect(legendElement.className).toContain('title--h5');
  });

  it('renders children content', () => {
    render(<CatalogFilterBlock {...defaultProps} />);
    const contentElement = screen.getByText('Filter Content');
    expect(contentElement).toBeInTheDocument();
  });
});
