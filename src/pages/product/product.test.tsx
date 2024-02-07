import { render, screen } from '@testing-library/react';
import ProductPage from './product';
import { redirectToRoute } from '../../store/action';
import { AppRoute, NameSpace, Status } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockState, generateProductMock } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';


vi.mock('../../hooks/use-scroll-to-element', () => ({ default: () => vi.fn() }));


describe('ProductPage component', () => {
  let mockHistory: MemoryHistory;
  const product = generateProductMock();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  test('renders loading spinner while product data is loading', () => {
    const initialState = {
      [NameSpace.Product]: {
        status: Status.Loading,
        ids: [product.id],
        entities: {
          [product.id]: product
        }
      }
    };
    const withHistoryComponent = withHistory(<ProductPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('redirects to PageNotFound if product data is not loaded', () => {
    const initialState = {
      [NameSpace.Product]: {
        status: Status.Success,
        ids: [],
        entities: {
        }
      }
    };

    const withHistoryComponent = withHistory(<ProductPage />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    expect(mockStore.getActions()).toContainEqual(redirectToRoute(AppRoute.PageNotFound));
  });
});
