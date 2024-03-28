import { MemoryHistory, createMemoryHistory } from 'history';
import BasketRemoveItemModal from './basket-remove-item';
import { withHistory, withStore } from '../../../utils/mock-component';
import { generateMockState, generateProductMock } from '../../../utils/mocks';
import { render, screen, fireEvent } from '@testing-library/react';
import { removeProduct, showModal } from '../../../store/action';
import { ModalName, NameSpace } from '../../../const';

describe('BasketRemoveItemModal component', () => {
  let mockHistory: MemoryHistory;
  const mockStateData = {
    [NameSpace.Modal]: {
      activeModal: ModalName.ProductRemove,
      selectedProduct: generateProductMock()
    }
  };

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('renders success message and buttons correctly', () => {
    const withHistoryComponent = withHistory(<BasketRemoveItemModal />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(mockStateData));
    const text = 'Удалить этот товар?';

    render(withStoreComponent);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('dispatches showModal action when "Продолжить покупки" button is clicked', () => {
    const withHistoryComponent = withHistory(<BasketRemoveItemModal />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(mockStateData));

    render(withStoreComponent);

    const continueShoppingButton = screen.getByText('Продолжить покупки');
    fireEvent.click(continueShoppingButton);

    expect(mockStore.getActions()).toContainEqual(showModal(null));
  });

  it('does not dispatch showModal action when "Удалить" button is clicked', () => {
    const withHistoryComponent = withHistory(<BasketRemoveItemModal />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(mockStateData));
    const buttonText = 'Удалить';

    render(withStoreComponent);

    const deleteProductButton = screen.getByText(buttonText);
    fireEvent.click(deleteProductButton);

    expect(mockStore.getActions()).toContainEqual(showModal(null));
    expect(mockStore.getActions()).toContainEqual(removeProduct(mockStateData[NameSpace.Modal].selectedProduct.id));
  });
});
