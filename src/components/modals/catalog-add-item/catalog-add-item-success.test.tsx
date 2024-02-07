import { render, screen, fireEvent } from '@testing-library/react';
import CatalogAddItemSuccessModal from './catalog-add-item-success';
import { generateMockState } from '../../../utils/mocks';
import { showModal } from '../../../store/action';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../../utils/mock-component';


describe('CatalogAddItemSuccessModal component', () => {
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('renders success message and buttons correctly', () => {
    const withHistoryComponent = withHistory(<CatalogAddItemSuccessModal />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });

  it('dispatches showModal action when "Продолжить покупки" button is clicked', () => {
    const withHistoryComponent = withHistory(<CatalogAddItemSuccessModal />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    const continueShoppingButton = screen.getByText('Продолжить покупки');
    fireEvent.click(continueShoppingButton);

    expect(mockStore.getActions()).toContainEqual(showModal(null));
  });

  it('does not dispatch showModal action when "Перейти в корзину" button is clicked', () => {
    const withHistoryComponent = withHistory(<CatalogAddItemSuccessModal />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    const goToBasketButton = screen.getByText('Перейти в корзину');
    fireEvent.click(goToBasketButton);

    expect(mockStore.getActions()).toContainEqual(showModal(null));
  });
});
