import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './modal';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockState, generateProductMock } from '../../utils/mocks';
import { ModalName, NameSpace } from '../../const';
import { showModal } from '../../store/action';

vi.mock('./catalog-add-item/catalog-add-item', () => ({
  default: () => <div data-testid="product-add-modal">Modal</div>
}));

describe('Modal component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders without crashing', () => {
    const initialState = {
      [NameSpace.Modal]: {
        activeModal: ModalName.ProductAdd,
        selectedProduct: generateProductMock()
      }
    };
    const withHistoryComponent = withHistory(<Modal />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('closes modal when cross button is clicked', () => {
    const initialState = {
      [NameSpace.Modal]: {
        activeModal: ModalName.ProductAdd,
        selectedProduct: generateProductMock()
      }
    };
    const withHistoryComponent = withHistory(<Modal />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);
    expect(mockStore.getActions()).toContainEqual(showModal(null));
  });

  it('renders ProductAdd modal when activeModal is ProductAdd', () => {
    const initialState = {
      [NameSpace.Modal]: {
        activeModal: ModalName.ProductAdd,
        selectedProduct: generateProductMock()
      }
    };
    const withHistoryComponent = withHistory(<Modal />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    const productAddModal = screen.getByTestId('product-add-modal'); // Assuming the modal component has a test id
    expect(productAddModal).toBeInTheDocument();
  });
});
