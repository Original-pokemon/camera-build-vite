import { MemoryHistory, createMemoryHistory } from 'history';
import { BasketItemType } from '../../types';
import { generateBasketItemMock, generateMockState } from '../../utils/mocks';
import BasketItem from './basket-item';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { getProductPriceFormat } from '../../utils/product';
import userEvent from '@testing-library/user-event';
import { changeProductQuantity, decreaseProductQuantity, increaseProductQuantity, selectProduct, showModal } from '../../store/action';
import { ModalName } from '../../const';


describe('BasketItem component', () => {
  let mockHistory: MemoryHistory;
  let product: BasketItemType;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    product = generateBasketItemMock(2);
  });

  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<BasketItem basketItem={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    expect(screen.getByText(product.name)).toBeInTheDocument();
  });

  it('correctly data in component', () => {
    const withHistoryComponent = withHistory(<BasketItem basketItem={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());
    const { quantity, level, vendorCode, price } = product;

    render(withStoreComponent);

    expect(screen.getByDisplayValue(quantity)).toBeInTheDocument();
    expect(screen.getByText(`${level} уровень`)).toBeInTheDocument();
    expect(screen.getByText(vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${getProductPriceFormat(price)} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${getProductPriceFormat(price * quantity)} ₽`)).toBeInTheDocument();
  });

  it('correctly changes quantity', async () => {
    const withHistoryComponent = withHistory(<BasketItem basketItem={product} />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    const increaseButtonElement = screen.getByRole('button', { name: 'увеличить количество товара' });
    const decreaseButtonElement = screen.getByRole('button', { name: 'уменьшить количество товара' });
    const inputElement = screen.getByDisplayValue(product.quantity);

    await userEvent.click(increaseButtonElement);
    expect(mockStore.getActions()).toContainEqual(increaseProductQuantity(product.id));

    await userEvent.click(decreaseButtonElement);
    expect(mockStore.getActions()).toContainEqual(decreaseProductQuantity(product.id));

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, '10');

    expect(mockStore.getActions()).toContainEqual(changeProductQuantity({ id: product.id, quantity: 10 }));
  });

  it('correctly deletes item', async () => {
    const withHistoryComponent = withHistory(<BasketItem basketItem={product} />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    const deleteButtonElement = screen.getByRole('button', { name: 'Удалить товар' });
    await userEvent.click(deleteButtonElement);

    expect(mockStore.getActions()).toContainEqual(selectProduct(product));
    expect(mockStore.getActions()).toContainEqual(showModal(ModalName.ProductRemove));
  });
});
