import { getAllByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './search-form';
import { withStore, withHistory } from '../../../utils/mock-component';
import faker from 'faker';

const fakeProductsName = Array.from({ length: 10 }, () => 'testName');

vi.mock('../../../hooks/state', () => {
  const generateNameListProduct = (): { name: string }[] => fakeProductsName.map((value) => ({ name: value, id: faker.datatype.uuid() }));

  const mockUseAppSelector = () => generateNameListProduct();

  return {
    useAppSelector: mockUseAppSelector
  };
});

describe('SearchForm', () => {
  const { withStoreComponent } = withStore(<SearchForm />);
  const withHistoryComponent = withHistory(withStoreComponent);

  it('render search form correctly', () => {
    render(withHistoryComponent);

    const searchInputElement = screen.getByPlaceholderText('Поиск по сайту');
    expect(searchInputElement).toBeInTheDocument();

    const selectListElement = screen.getByRole('list');
    expect(selectListElement).toBeInTheDocument();
  });

  it('render search list correctly when input value is less than min search input length', async () => {
    const inputText = 'ab';

    render(withHistoryComponent);

    const searchInputElement = screen.getByPlaceholderText('Поиск по сайту');

    await userEvent.type(searchInputElement, inputText);
    const selectListElement = screen.getByRole('list');
    expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();

    expect(selectListElement.children).toHaveLength(0);
  });

  it('render search list correctly when input value is more than 3', async () => {
    const searchText = fakeProductsName[0];

    render(withHistoryComponent);

    const searchInputElement = screen.getByPlaceholderText('Поиск по сайту');
    const selectListElement = screen.getByRole('list');

    await userEvent.type(searchInputElement, searchText);
    await new Promise((r) => setTimeout(r, 1000));

    expect(screen.getByDisplayValue(searchText)).toBeInTheDocument();

    const listItems = getAllByTestId(selectListElement, 'product-link');
    expect(listItems).toHaveLength(fakeProductsName.length);
  });
});
