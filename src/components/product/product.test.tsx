import { render, screen, fireEvent } from '@testing-library/react';
import Product from './product';
import { addToBasket, } from '../../store/action';
import { MemoryHistory, createMemoryHistory } from 'history';
import { generateMockState, generateBasketItemMock } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { NameSpace, Status } from '../../const';

describe('Product component', () => {
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  const product = generateBasketItemMock(1);

  it('renders product information correctly', () => {
    const initialState = {
      [NameSpace.Basket]: {
        status: Status.Success,
        ids: [],
        entities: {

        }
      }
    };
    const withHistoryComponent = withHistory(<Product product={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    expect(screen.getByTestId('product')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('displays "В корзине" button when product is in basket', () => {

    const initialState = {
      [NameSpace.Basket]: {
        status: Status.Success,
        ids: [product.id],
        entities: {
          [product.id]: product,
        }
      }
    };
    const withHistoryComponent = withHistory(<Product product={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    expect(screen.getByText('В корзине')).toBeInTheDocument();
  });

  it('dispatches addToBasket action when "Добавить в корзину" button is clicked', () => {
    const initialState = {
      [NameSpace.Basket]: {
        status: Status.Success,
        ids: [],
        entities: {

        }
      }
    };
    const withHistoryComponent = withHistory(<Product product={product} />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    const addToBasketButton = screen.getByTestId('buy-button');
    fireEvent.click(addToBasketButton);

    expect(mockStore.getActions()).toContainEqual(addToBasket(product));
  });
});
