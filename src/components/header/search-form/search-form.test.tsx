import { render, screen } from '@testing-library/react';
import SearchForm from './search-form';

describe('SearchForm', () => {
  it('renders search form correctly', () => {
    render(<SearchForm />);

    const searchInputElement = screen.getByPlaceholderText('Поиск по сайту');
    expect(searchInputElement).toBeInTheDocument();

    const selectListElement = screen.getByRole('list');
    expect(selectListElement).toBeInTheDocument();

    const selectItemElements = screen.getAllByRole('listitem');
    expect(selectItemElements).toHaveLength(5);
    selectItemElements.forEach((item, index) => {
      expect(item).toHaveTextContent(`Cannonball Pro MX ${8 - index}i`);
    });
  });
});
