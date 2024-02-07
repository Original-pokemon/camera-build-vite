import { render, screen, } from '@testing-library/react';
import AddReviewModal from './product-review';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../../utils/mock-component';
import { generateMockState } from '../../../utils/mocks';

describe('AddReviewModal', () => {
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<AddReviewModal />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByLabelText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите ваше имя?')).toBeInTheDocument();
    expect(screen.getByLabelText('Достоинства')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Основные преимущества товара')).toBeInTheDocument();
    expect(screen.getByLabelText('Недостатки')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Главные недостатки товара')).toBeInTheDocument();
    expect(screen.getByLabelText('Комментарий')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Поделитесь своим опытом покупки')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });
});
