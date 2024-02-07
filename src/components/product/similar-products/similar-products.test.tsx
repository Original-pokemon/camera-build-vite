import { render, screen } from '@testing-library/react';
import SimilarProducts from './similar-products';
import { withHistory, withStore } from '../../../utils/mock-component';
import { generateProductsMock, generateMockState, generateProductMock } from '../../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { NameSpace, Status } from '../../../const';


describe('SimilarProducts component', () => {
  const product = generateProductMock();
  const similarProducts = generateProductsMock(); // Пример тестовых данных

  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders loading spinner while fetching data', () => {
    const initialState = {
      [NameSpace.SimilarProducts]: {
        status: Status.Loading,
        similarProducts
      }
    };
    const withHistoryComponent = withHistory(<SimilarProducts product={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders similar products when data is loaded', () => {
    const initialState = {
      [NameSpace.SimilarProducts]: {
        status: Status.Success,
        similarProducts
      }
    };
    const withHistoryComponent = withHistory(<SimilarProducts product={product} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));

    render(withStoreComponent);

    const similarProductsSlider = screen.getByTestId('similar-products-slider');
    expect(similarProductsSlider).toBeInTheDocument();

    const similarProductElements = screen.getAllByTestId('similar-product-slide');
    expect(similarProductElements).toHaveLength(similarProducts.length);
  });
});
