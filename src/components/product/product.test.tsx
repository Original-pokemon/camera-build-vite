import { render, screen, fireEvent } from '@testing-library/react';
import Product from './product';
import { showModal, } from '../../store/action';
import { MemoryHistory, createMemoryHistory } from 'history';
import { generateMockState, generateBasketItemMock } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { ModalName, NameSpace, Status } from '../../const';

describe('Product component', () => {
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  const product = generateBasketItemMock(1);

  it('renders product information correctly', () => {
    const initialState = {
      [NameSpace.Basket]: {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Success,
        ids: [],
        entities: {}
      }
    };
    const withHistoryComponent = withHistory(<Product product={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    expect(screen.getByTestId('product')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('dispatches showModal action when "Добавить в корзину" button is clicked', () => {
    const initialState = {
      [NameSpace.Basket]: {
        coupon: null,
        couponPostStatus: Status.Idle,
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

    expect(mockStore.getActions()).toContainEqual(showModal(ModalName.ProductAdd));
  });
});
