import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockState } from '../../utils/mocks';
import BasketPage from './basket';
import { render, screen } from '@testing-library/react';

const SUMMARY_ID = 'basket-summary';
const LIST_ID = 'basket-list';
const BREADCRUMBS_ID = 'basket-breadcrumbs';

vi.mock('../../components/basket/basket-summary', () => ({
  default: () => <div data-testid={SUMMARY_ID}>Basket Summary</div>
}));

vi.mock('../../components/basket/basket-list', () => ({
  default: () => <div data-testid={LIST_ID}>Basket List</div>
}));

vi.mock('../../components/breadcrumbs/breadcrumbs', () => ({
  default: () => <div data-testid={BREADCRUMBS_ID}>Breadcrumbs</div>
}));

describe('BasketPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('render correctly', () => {
    const withHistoryComponent = withHistory(<BasketPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    expect(screen.getByTestId(SUMMARY_ID)).toBeInTheDocument();
    expect(screen.getByTestId(LIST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(BREADCRUMBS_ID)).toBeInTheDocument();
  });
});
