import { MemoryHistory, createMemoryHistory } from 'history';
import { generateBasketItemMock, generateMockState } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { NameSpace, Status } from '../../const';
import BasketList from './basket-list';

const PRODUCT_ID = 'basket-item';

vi.mock('./basket-item', () => ({
  default: () => <div data-testid={PRODUCT_ID}>Product in Basket</div>
}));

const PRODUCTS_LENGTH = 5;

describe('BasketList component', () => {
  let mockHistory: MemoryHistory;
  const basketStorage = Array.from({ length: PRODUCTS_LENGTH }, () => generateBasketItemMock(2));
  const basketStoreData = {
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
  };

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<BasketList />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));

    render(withStoreComponent);

    expect(screen.getByTestId('basket-list')).toBeInTheDocument();
  });

  it('correctly product items length in component', () => {
    const withHistoryComponent = withHistory(<BasketList />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));

    render(withStoreComponent);

    const products = screen.getAllByTestId(PRODUCT_ID);
    expect(products).toHaveLength(PRODUCTS_LENGTH);
  });


  it('correctly render without products in basket', () => {
    const withHistoryComponent = withHistory(<BasketList />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });


});
