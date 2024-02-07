import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './product-card';
import { showModal, selectProduct } from '../../store/action';
import { ModalName } from '../../const/modal';
import { generateBasketItemMock, generateMockState } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { NameSpace, Status } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';

describe('ProductCard component', () => {
  let mockHistory: MemoryHistory;
  const product = generateBasketItemMock(1);


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('renders correctly with default props', () => {
    const withHistoryComponent = withHistory(<ProductCard product={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());
    render(withStoreComponent);

    const productTitle = screen.getByText(product.name);
    expect(productTitle).toBeInTheDocument();

    const productPrice = screen.getByText(`${product.price} ₽`);
    expect(productPrice).toBeInTheDocument();

    const buyButton = screen.getByText('Купить');
    expect(buyButton).toBeInTheDocument();

    const detailsButton = screen.getByText('Подробнее');
    expect(detailsButton).toBeInTheDocument();
  });

  it('renders correctly when in basket', () => {
    const initialState = {
      [NameSpace.Basket]: {
        status: Status.Success,
        ids: [product.id],
        entities: {
          [product.id]: product,
        }
      }
    };
    const withHistoryComponent = withHistory(<ProductCard product={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));
    render(withStoreComponent);

    const inCartButton = screen.getByText('В корзине');
    expect(inCartButton).toBeInTheDocument();
  });

  it('dispatches showModal and selectProduct actions when Buy button is clicked', () => {
    const withHistoryComponent = withHistory(<ProductCard product={product} />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState());
    render(withStoreComponent);

    const buyButton = screen.getByText('Купить');
    fireEvent.click(buyButton);

    expect(mockStore.getActions()).toContainEqual(showModal(ModalName.ProductAdd));
    expect(mockStore.getActions()).toContainEqual(selectProduct(product));
  });
});
