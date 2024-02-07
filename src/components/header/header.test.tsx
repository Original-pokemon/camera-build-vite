import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-component';

const MOCK_BASKET_TOTAL = 5;

vi.mock('../../hooks/state', () => {
  const mockUseAppSelector = () => MOCK_BASKET_TOTAL;

  return {
    useAppSelector: mockUseAppSelector
  };
});

describe('Header component', () => {
  const { withStoreComponent } = withStore(<Header />, {});
  const componentWithHistory = withHistory(withStoreComponent);

  it('renders correctly', () => {
    render(componentWithHistory);

    const basketCountElement = screen.getByTestId('header');
    expect(basketCountElement).toBeInTheDocument();
  });

  it('displays correct basket total', () => {
    render(componentWithHistory);

    // Проверка отображения количества товаров в корзине
    const basketCountElement = screen.getByText(MOCK_BASKET_TOTAL.toString());
    expect(basketCountElement).toBeInTheDocument();
  });
});
