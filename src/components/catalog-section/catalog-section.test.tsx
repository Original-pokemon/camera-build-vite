import { render, screen } from '@testing-library/react';
import CatalogSection from './catalog-section';
import { NameSpace, Status } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateProductMock } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { ProductType } from '../../types';
import userEvent from '@testing-library/user-event';
import { MAX_PRICE_NAME, MIN_PRICE_NAME } from './const';

vi.mock('../product-card/product-card', () => ({
  default: ({ product }: { product: ProductType }) => (
    <div data-testid="product-card">
      <p data-testid="product-name">{product.name}</p>
      <p data-testid="product-price">{product.price}</p>
      <p data-testid="product-rating">{product.rating}</p>
      <p data-testid="product-type">{product.type}</p>
      <p data-testid="product-category">{product.category}</p>
      <p data-testid="product-level">{product.level}</p>
    </div>
  ),
}));

vi.mock('./pagination/pagination', () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

describe('CatalogSection component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
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
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
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
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
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
    // mockHistory.location.search = 'max_price=100';
  });

  it('correctly filter by price', async () => {
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
    const PRODUCTS_LENGTH = 50;
    const debounceTime = 1200;
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

    await userEvent.type(screen.getByTestId(MIN_PRICE_NAME), '5000');
    await new Promise((r) => setTimeout(r, debounceTime));
    await userEvent.type(screen.getByTestId(MAX_PRICE_NAME), '10000');
    await new Promise((r) => setTimeout(r, debounceTime));


    const productPriceList = screen.queryAllByTestId('product-price');

    expect(productPriceList.every((priceElement) => Number(priceElement.textContent) <= 10000)).toBeTruthy();
    expect(productPriceList.every((priceElement) => Number(priceElement.textContent) >= 5000)).toBeTruthy();
  });

  it('correctly filter by category', async () => {
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
    const PRODUCTS_LENGTH = 50;
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

    await userEvent.click(screen.getByLabelText('Фотоаппарат'));

    const productCategoryList = screen.queryAllByTestId('product-category');

    expect(productCategoryList.every((categoryElement) => categoryElement.textContent === 'Фотоаппарат')).toBeTruthy();
  });

  it('correctly filter by camera type', async () => {
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
    const PRODUCTS_LENGTH = 50;
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

    await userEvent.click(screen.getByLabelText('Цифровая'));

    const productTypeList = screen.queryAllByTestId('product-type');

    expect(productTypeList.every((typeElement) => typeElement.textContent === 'Цифровая')).toBeTruthy();
  });

  it('correctly filter by camera level', async () => {
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
    const PRODUCTS_LENGTH = 50;
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

    await userEvent.click(screen.getByLabelText('Любительский'));

    const productLevelList = screen.queryAllByTestId('product-level');

    expect(productLevelList.every((levelElement) => levelElement.textContent === 'Любительский')).toBeTruthy();
  });

  it('sort by price work correctly', async () => {
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
    const PRODUCTS_LENGTH = 50;
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

    await userEvent.click(screen.getByLabelText('по цене'));
    await userEvent.click(screen.getByLabelText('По убыванию'));

    const productPriceList = screen.queryAllByTestId('product-price');
    expect(Number(productPriceList.at(0)?.textContent) >= Number(productPriceList.at(-1)?.textContent)).toBeTruthy();
  });

  it('sort by rating work correctly', async () => {
    const withHistoryComponent = withHistory(<CatalogSection />, mockHistory);
    const PRODUCTS_LENGTH = 50;
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

    await userEvent.click(screen.getByLabelText('по популярности'));
    await userEvent.click(screen.getByLabelText('По возрастанию'));

    const productRatingList = screen.queryAllByTestId('product-rating');
    expect(Number(productRatingList.at(0)?.textContent) <= Number(productRatingList.at(-1)?.textContent)).toBeTruthy();
  });
});
