import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockState } from '../../utils/mocks';
import App from './app';

vi.mock('../../pages/catalog/catalog', () => ({
  default: () => <div>Catalog Page</div>
}));
vi.mock('../../pages/product/product', () => ({
  default: () => <div>Product Page</div>
}));
vi.mock('../../pages/basket/basket', () => ({
  default: () => <div>Basket Page</div>
}));
vi.mock('../../pages/not-found/not-found', () => ({
  default: () => <div>Not Found Page</div>
}));

describe('App component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders BasketPage when route is Basket', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    mockHistory.push(AppRoute.Basket);
    render(withStoreComponent);

    const basketPage = screen.getByText('Basket Page');
    expect(basketPage).toBeInTheDocument();
  });


  it('renders ProductPage when route is Product', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    mockHistory.push(AppRoute.Product);
    render(withStoreComponent);

    const productPage = screen.getByText('Product Page');
    expect(productPage).toBeInTheDocument();
  });

  it('renders CatalogPage when route is Catalog', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);

    const catalogPage = screen.getByText('Catalog Page');
    expect(catalogPage).toBeInTheDocument();
  });

  it('renders NotFoundPage when route is not found', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());
    const unknownRoute = '/unknown-route';

    mockHistory.push(unknownRoute);
    render(withStoreComponent);

    const notFoundPage = screen.getByText('Not Found Page');
    expect(notFoundPage).toBeInTheDocument();
  });
});
