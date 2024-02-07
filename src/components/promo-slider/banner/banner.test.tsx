import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { generateProductMock, generatePromoMock, generateMockState } from '../../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../../utils/mock-component';

vi.mock('../../../hooks/state', () => ({
  useAppSelector: () => generateProductMock(),
}));

describe('Banner component', () => {
  let mockHistory: MemoryHistory;
  const promo = generatePromoMock();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<Banner promo={promo} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());
    render(withStoreComponent);

    const bannerElement = screen.getByTestId('banner');
    expect(bannerElement).toBeInTheDocument();
  });
});
