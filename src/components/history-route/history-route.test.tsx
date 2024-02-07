import { createMemoryHistory } from 'history';
import HistoryRouter from './history-route';
import { render, screen } from '@testing-library/react';

describe('Component: History Router', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly with HOC', () => {
    const expectedText = 'History Router child';
    const mockComponent = <span>{expectedText}</span>;
    const preparedComponent = (
      <HistoryRouter history={mockHistory}>{mockComponent}</HistoryRouter>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
  it('updates state when history changes', () => {
    const { rerender } = render(
      <HistoryRouter history={mockHistory}>
        <div>Child Component</div>
      </HistoryRouter>
    );

    expect(mockHistory.location.pathname).toBe('/');
    mockHistory.push('/new-route');
    rerender(
      <HistoryRouter history={mockHistory}>
        <div>Child Component</div>
      </HistoryRouter>
    );
    expect(mockHistory.location.pathname).toBe('/new-route');
  });
});
