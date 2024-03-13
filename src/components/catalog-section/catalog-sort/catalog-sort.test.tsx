import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogSort from './catalog-sort';
import { withHistory } from '../../../utils/mock-component';
import { createMemoryHistory } from 'history';

describe('CatalogSort', () => {
  const history = createMemoryHistory();
  const componentWithHistory = withHistory(<CatalogSort />, history);

  it('renders without crashing', () => {
    render(componentWithHistory);
  });

  it('allows sorting by price', async () => {
    render(componentWithHistory);
    const sortByPriceInput = screen.getByLabelText('по цене');
    await userEvent.click(sortByPriceInput);
    expect(sortByPriceInput).toBeChecked();
  });

  it('allows sorting by up', async () => {
    const SORT_VALUE = 'direction=asc';

    render(componentWithHistory);
    const sortUpInput = screen.getByLabelText('По возрастанию');
    await userEvent.click(sortUpInput);
    expect(sortUpInput).toBeChecked();
    expect(history.location.search).toContain(SORT_VALUE);

  });

  it('allows sorting by down', async () => {
    const SORT_VALUE = 'direction=desc';

    render(componentWithHistory);
    const sortUpInput = screen.getByLabelText('По убыванию');
    await userEvent.click(sortUpInput);
    expect(sortUpInput).toBeChecked();
    expect(history.location.search).toContain(SORT_VALUE);

  });

  it('allows sorting by popular', async () => {
    const SORT_VALUE = 'sortBy=popularity';

    render(componentWithHistory);
    const sortByPriceInput = screen.getByLabelText('по популярности');

    await userEvent.click(sortByPriceInput);
    expect(sortByPriceInput).toBeChecked();
    expect(history.location.search).toContain(SORT_VALUE);
  });

  it('allows sorting by price', async () => {
    const SORT_VALUE = 'sortBy=price';

    render(componentWithHistory);
    const sortByPriceInput = screen.getByLabelText('по цене');

    await userEvent.click(sortByPriceInput);
    expect(sortByPriceInput).toBeChecked();
    expect(history.location.search).toContain(SORT_VALUE);
  });
});
