import { render, screen } from '@testing-library/react';
import CatalogSection from './catalog-section';
import { NameSpace, Status } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateProductMock } from '../../utils/mocks';

vi.mock('../product-card/product-card', () => ({
  default: () => <div data-testid="product-card">Product Card</div>,
}));

vi.mock('./pagination/pagination', () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

describe('CatalogSection component', () => {
  const withHistoryComponent = withHistory(<CatalogSection />);


  it('renders correctly', () => {
    const PRODUCTS_LENGTH = 10;
    const products = Array.from({ length: PRODUCTS_LENGTH }, generateProductMock);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.Product]: {
        status: Status.Success,
        ids: Array.from({ length: PRODUCTS_LENGTH }, (_, index) => index),
        entities: Object.fromEntries(products.entries())
      },
    }
    );
    render(withStoreComponent);

    const catalogSection = screen.getByTestId('catalog');
    const pagination = screen.getByTestId('pagination');
    expect(catalogSection).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
  });

  it('correctly calculates visibleProducts', () => {
    const PRODUCTS_LENGTH = 20;
    const products = Array.from({ length: PRODUCTS_LENGTH }, generateProductMock);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.Product]: {
        status: Status.Success,
        ids: Array.from({ length: PRODUCTS_LENGTH }, (_, index) => index),
        entities: Object.fromEntries(products.entries())
      },
    }
    );
    const MAX_PRODUCT_ON_PAGE = 9;

    render(withStoreComponent);
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(MAX_PRODUCT_ON_PAGE);
  });

  it('correctly render pagination', () => {
    const PRODUCTS_LENGTH = 9;
    const products = Array.from({ length: PRODUCTS_LENGTH }, generateProductMock);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.Product]: {
        status: Status.Success,
        ids: Array.from({ length: PRODUCTS_LENGTH }, (_, index) => index),
        entities: Object.fromEntries(products.entries())
      },
    }
    );
    render(withStoreComponent);

    const pagination = screen.queryByTestId('pagination');
    expect(pagination).not.toBeInTheDocument();
  });
});
