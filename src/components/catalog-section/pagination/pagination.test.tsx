import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from './pagination';
import { withHistory } from '../../../utils/mock-component';
import { createMemoryHistory } from 'history';

describe('Pagination component', () => {
  const TOTAL_PAGES = 9;
  const onClick = vi.fn();

  it('renders correctly', () => {
    const LINKS_ON_PAGE = 5;
    const CURRENT_PAGE = 5;

    const componentWithHistory = withHistory(<Pagination totalPages={TOTAL_PAGES} currentPage={CURRENT_PAGE} onClick={onClick} />);
    render(componentWithHistory);

    const paginationElement = screen.getByRole('list');
    expect(paginationElement).toBeInTheDocument();

    const paginationLinks = screen.getAllByRole('link');
    expect(paginationLinks).toHaveLength(LINKS_ON_PAGE);

    expect(paginationLinks.at(1)).toHaveTextContent('4');
    expect(paginationLinks.at(2)).toHaveTextContent('5');
    expect(paginationLinks.at(3)).toHaveTextContent('6');
  });


  it('renders firs page correctly', () => {
    const LINKS_ON_PAGE = 4;
    const CURRENT_PAGE = 1;

    const componentWithHistory = withHistory(<Pagination totalPages={TOTAL_PAGES} currentPage={CURRENT_PAGE} onClick={onClick} />);
    render(componentWithHistory);

    const paginationElement = screen.getByRole('list');
    expect(paginationElement).toBeInTheDocument();

    const paginationLinks = screen.getAllByRole('link');
    expect(paginationLinks).toHaveLength(LINKS_ON_PAGE);

    expect(paginationLinks.at(0)).toHaveTextContent('1');
    expect(paginationLinks.at(1)).toHaveTextContent('2');
    expect(paginationLinks.at(2)).toHaveTextContent('3');
  });

  it('renders last page correctly', () => {
    const LINKS_ON_PAGE = 4;
    const CURRENT_PAGE = 9;

    const componentWithHistory = withHistory(<Pagination totalPages={TOTAL_PAGES} currentPage={CURRENT_PAGE} onClick={onClick} />);
    render(componentWithHistory);

    const paginationElement = screen.getByRole('list');
    expect(paginationElement).toBeInTheDocument();

    const paginationLinks = screen.getAllByRole('link');
    expect(paginationLinks).toHaveLength(LINKS_ON_PAGE);

    expect(paginationLinks.at(1)).toHaveTextContent('7');
    expect(paginationLinks.at(2)).toHaveTextContent('8');
    expect(paginationLinks.at(3)).toHaveTextContent('9');

  });

  it('calls onClick with the correct page number when a pagination link is clicked', () => {
    const CURRENT_PAGE = 5;
    const NEXT_LINK_VALUE = 'page=7';
    const PREV_LINK_VALUE = 'page=3';
    const SELECT_LINK = 6;
    const SELECT_LINK_VALUE = `page=${SELECT_LINK}`;
    const history = createMemoryHistory();

    const componentWithHistory = withHistory(<Pagination totalPages={TOTAL_PAGES} currentPage={CURRENT_PAGE} onClick={onClick} />, history);
    render(componentWithHistory);


    const pageLink = screen.getByTestId(`page-link-${SELECT_LINK}`);
    fireEvent.click(pageLink);
    expect(history.location.search).toContain(SELECT_LINK_VALUE);

    const nextPageLink = screen.getByTestId('next-link');
    fireEvent.click(nextPageLink);
    expect(history.location.search).toContain(NEXT_LINK_VALUE);

    const prevPageLink = screen.getByTestId('prev-link');
    fireEvent.click(prevPageLink);
    expect(history.location.search).toContain(PREV_LINK_VALUE);
  });
});
