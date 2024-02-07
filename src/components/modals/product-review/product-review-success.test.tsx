import { render, screen, fireEvent } from '@testing-library/react';
import { showModal } from '../../../store/action';
import ReviewSuccessModal from './product-review-success';
import { withHistory, withStore } from '../../../utils/mock-component';
import { MemoryHistory, createMemoryHistory } from 'history';
import { generateMockState } from '../../../utils/mocks';


describe('ReviewSuccessModal', () => {
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<ReviewSuccessModal />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);


    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('dispatches showModal action on button click', () => {
    const withHistoryComponent = withHistory(<ReviewSuccessModal />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    const button = screen.getByText('Вернуться к покупкам');
    fireEvent.click(button);

    expect(mockStore.getActions()).toContainEqual(showModal(null));
  });
});
