import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, NameSpace, Status } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateBasketItemMock, generateMockState } from '../../utils/mocks';
import App from './app';
import { setBasket } from '../../store/action';
import { BasketItemType } from '../../types';
import { BASKET_KEY } from './const';

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

  it('if localStorage has basket, it should be set it in store', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState());
    const basketLocalStorage = Array.from({ length: 5 }, () => generateBasketItemMock(2));


    localStorage.setItem(BASKET_KEY, JSON.stringify(basketLocalStorage));

    render(withStoreComponent);

    expect(mockStore.getActions()).toContainEqual(setBasket(basketLocalStorage));
  });

  it('if store has basket, it should be set in localStorage', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const basketStorage = Array.from({ length: 5 }, () => generateBasketItemMock(2));
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState({
      [NameSpace.Basket]: {
        couponPostStatus: Status.Idle,
        coupon: null,
        status: Status.Idle,
        ids: [basketStorage[0].id, basketStorage[1].id, basketStorage[2].id, basketStorage[3].id, basketStorage[4].id],
        entities: {
          [basketStorage[0].id]: basketStorage[0],
          [basketStorage[1].id]: basketStorage[1],
          [basketStorage[2].id]: basketStorage[2],
          [basketStorage[3].id]: basketStorage[3],
          [basketStorage[4].id]: basketStorage[4],
        }
      }
    }));

    render(withStoreComponent);

    const result = localStorage.getItem(BASKET_KEY);
    const basketLocalStorage = JSON.parse(result as string) as BasketItemType[];

    expect(basketLocalStorage).toEqual(basketStorage);
  });
});
