import { useEffect, useMemo, useRef, useState } from 'react';
import CatalogFilter from './catalog-filter/catalog-filter';
import CatalogSort from './catalog-sort/catalog-sort';
import Pagination from './pagination/pagination';
import ProductCard from '../product-card/product-card';
import { useSearchParams } from 'react-router-dom';
import { AppRoute, Sort, SortDirection, Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getProducts, getProductsStatus, redirectToRoute } from '../../store/action';
import { fetchProducts } from '../../store/slices/product-data/product-data-thunk';
import useSmoothScrollToElement from '../../hooks/use-scroll-to-element';
import Spinner from '../spinner/spinner';
import { ProductType } from '../../types';
import { toast } from 'react-toastify';
import { isDirectionType, isSortType } from '../../utils/sort';
import { SortDirectionType, SortType } from '../../types/sort';

const PRODUCT_PER_PAGE = 9;

const sortByType = (products: ProductType[], sortType: SortType, direction: SortDirectionType): ProductType[] => products.slice().sort((a, b) => {
  const productProperty = sortType === Sort.Popularity ? 'rating' : 'price';

  if (direction === SortDirection.ASC) {
    return a[productProperty] - b[productProperty];
  } else {
    return b[productProperty] - a[productProperty];
  }
});

const getVisibleProducts = (products: ProductType[], startIndex: number, endIndex: number, sortType: SortType | null, sortDirection: SortDirectionType | null) => {
  if (sortType && sortDirection) {
    const sortedProducts = sortByType(products, sortType, sortDirection);

    const visibleProducts = sortedProducts.slice(startIndex, endIndex);
    return visibleProducts;
  }

  return products.slice(startIndex, endIndex);
};

const getProductsElements = (visibleProducts: ProductType[]) => {
  const productsElements = visibleProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ));

  return productsElements;
};

const CatalogSection = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const productsLoadStatus = useAppSelector(getProductsStatus);
  const products = useAppSelector(getProducts);
  const scrollToElement = useSmoothScrollToElement();

  const elementRef = useRef<HTMLDivElement>(null);

  const isLoaded = productsLoadStatus === Status.Success;
  const isLoading = productsLoadStatus === Status.Loading;
  const isIdle = productsLoadStatus === Status.Idle;
  const isError = productsLoadStatus === Status.Error;

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const sortParam = searchParams.get('sortBy');
  const sortType = isSortType(sortParam) ? sortParam : null;

  const directionParam = searchParams.get('direction');
  const sortDirection = isDirectionType(directionParam) ? directionParam : null;

  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
  const endIndex = startIndex + PRODUCT_PER_PAGE;
  const visibleProducts = useMemo(() => getVisibleProducts(products, startIndex, endIndex, sortType, sortDirection), [products, startIndex, endIndex, sortType, sortDirection]);
  const totalPages = Math.ceil(products.length / PRODUCT_PER_PAGE);

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchProducts());
    }
    if (isError) {
      toast.error('Произошла ошибка при загрузке каталога. Попробуйте перезагрузить страницу.');
    }
  }, [dispatch, isIdle, isError]);

  if ((initialPage > totalPages) && isLoaded) {
    dispatch(redirectToRoute(AppRoute.PageNotFound));
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToElement(elementRef.current || undefined);
  };

  return (
    <section className="catalog" data-testid='catalog'>
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>
          <div className="catalog__content">
            <CatalogSort />
            {isLoading && <Spinner />}

            {isLoaded && (
              <div className="cards catalog__cards" ref={elementRef}>
                {getProductsElements(visibleProducts)}
              </div>
            )}
            {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onClick={handlePageChange} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
