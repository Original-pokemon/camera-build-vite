import { render, screen, fireEvent } from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('CatalogSort', () => {
  it('renders without crashing', () => {
    render(<CatalogSort />);
  });

  it('allows sorting by price', () => {
    render(<CatalogSort />);
    const sortByPriceInput = screen.getByLabelText('по цене');
    fireEvent.click(sortByPriceInput);
    expect(sortByPriceInput).toBeChecked();
  });

  it('allows sorting by up', () => {
    render(<CatalogSort />);
    const sortUpInput = screen.getByLabelText('По возрастанию');
    fireEvent.click(sortUpInput);
    expect(sortUpInput).toBeChecked();
  });

  it('allows sorting by popular', () => {
    render(<CatalogSort />);
    const sortByPriceInput = screen.getByLabelText('по популярности');
    fireEvent.click(sortByPriceInput);
    expect(sortByPriceInput).toBeChecked();
  });
});
