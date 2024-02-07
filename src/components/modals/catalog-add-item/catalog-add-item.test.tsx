import { fireEvent, render, screen } from '@testing-library/react';
import CatalogAddItemModal from './catalog-add-item';
import { describe } from 'vitest';
import { MemoryHistory, createMemoryHistory } from 'history';
import { generateMockState, generateProductMock } from '../../../utils/mocks';
import { withHistory, withStore } from '../../../utils/mock-component';
import { ModalName, NameSpace } from '../../../const';
import { addToBasket, selectProduct, showModal } from '../../../store/action';

describe('CatalogAddItemModal component', () => {
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders without errors and displays all elements', () => {
    const initialState = {
      [NameSpace.Modal]: {
        activeModal: ModalName.ProductAdd,
        selectedProduct: generateProductMock()
      }
    };

    const withHistoryComponent = withHistory(< CatalogAddItemModal />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('clicking "Добавить в корзину" button triggers addToBasket action and closes modal', () => {
    const initialState = {
      [NameSpace.Modal]: {
        activeModal: ModalName.ProductAdd,
        selectedProduct: generateProductMock()
      }
    };

    const withHistoryComponent = withHistory(< CatalogAddItemModal />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    const addToCartButton = screen.getByText('Добавить в корзину');
    fireEvent.click(addToCartButton);


    expect(mockStore.getActions()).toContainEqual(addToBasket(initialState[NameSpace.Modal].selectedProduct));
    expect(mockStore.getActions()).toContainEqual(selectProduct(null));
    expect(mockStore.getActions()).toContainEqual(showModal(ModalName.ProductAddSuccess));
  });
});
