import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory } from '../../utils/mock-component';

describe('NotFoundPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders 404 page with correct content', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />, mockHistory);

    render(withHistoryComponent);

    const titleElement = screen.getByText(/404/i);
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(/Страница, которую вы ищете, не найдена/i);
    expect(descriptionElement).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /На главную/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });
});


