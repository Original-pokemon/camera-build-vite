import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../../utils/mock-component';
import { generateMockState, generateProductMock } from '../../../utils/mocks';
import { render, screen, fireEvent } from '@testing-library/react';
import { resetBasket, showModal } from '../../../store/action';
import { ModalName, NameSpace } from '../../../const';
import ProductBasketSuccess from './product-basket-success';

describe('ProductBasketSuccess component', () => {
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
    const withHistoryComponent = withHistory(<ProductBasketSuccess />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(mockStateData));
    const text = 'Спасибо за покупку';

    render(withStoreComponent);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('dispatches showModal action when "Вернуться к покупкам" button is clicked', () => {
    const withHistoryComponent = withHistory(<ProductBasketSuccess />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(mockStateData));

    render(withStoreComponent);

    const continueShoppingButton = screen.getByText('Вернуться к покупкам');
    fireEvent.click(continueShoppingButton);

    expect(mockStore.getActions()).toContainEqual(showModal(null));
  });

  it('resetBasket function is called on component unmount', () => {
    const withHistoryComponent = withHistory(<ProductBasketSuccess />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(mockStateData));

    const { unmount } = render(withStoreComponent);

    unmount();

    expect(mockStore.getActions()).toContainEqual(resetBasket());
  });
});
