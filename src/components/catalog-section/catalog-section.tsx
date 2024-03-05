import { useEffect, useMemo, useRef } from 'react';
import CatalogFilter from './catalog-filter/catalog-filter';
import CatalogSort from './catalog-sort/catalog-sort';
import Pagination from './pagination/pagination';
import ProductCard from '../product-card/product-card';
import { useSearchParams } from 'react-router-dom';
import { FilterParamName, MAX_PRICE_NAME, MIN_PRICE_NAME } from './const';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getProducts, getProductsStatus } from '../../store/action';
import { fetchProducts } from '../../store/slices/product-data/product-data-thunk';
import useSmoothScrollToElement from '../../hooks/use-scroll-to-element';
import Spinner from '../spinner/spinner';
import { ProductType } from '../../types';
import { toast } from 'react-toastify';
import { filterByValue, getVisibleProducts, isCameraType, isCategoryType, isDirectionType, isLevelType, isSortType, sortByType } from './utils';
import { Status } from '../../const';

const PRODUCT_PER_PAGE = 9;

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
  const [searchParams, setSearchParams] = useSearchParams();
  const productsLoadStatus = useAppSelector(getProductsStatus);
  const products = useAppSelector(getProducts);
  const scrollToElement = useSmoothScrollToElement();

  const elementRef = useRef<HTMLDivElement>(null);

  const isLoaded = productsLoadStatus === Status.Success;
  const isLoading = productsLoadStatus === Status.Loading;
  const isIdle = productsLoadStatus === Status.Idle;
  const isError = productsLoadStatus === Status.Error;

  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const sortParam = searchParams.get('sortBy');
  const sortType = isSortType(sortParam) ? sortParam : null;

  const directionParam = searchParams.get('direction');
  const sortDirection = isDirectionType(directionParam) ? directionParam : null;

  const categorySearchParam = searchParams.get(FilterParamName.Category);
  const categoryType = isCategoryType(categorySearchParam) ? categorySearchParam : null;

  const cameraTypeSearchParam = searchParams.get(FilterParamName.CameraType);
  const cameraType = isCameraType(cameraTypeSearchParam) ? cameraTypeSearchParam : null;

  const currentMinPrice = searchParams.get(MIN_PRICE_NAME) ? parseInt(searchParams.get(MIN_PRICE_NAME) as string, 10) : null;
  const currentMaxPrice = searchParams.get(MAX_PRICE_NAME) ? parseInt(searchParams.get(MAX_PRICE_NAME) as string, 10) : null;

  const levelSearchParam = searchParams.get(FilterParamName.Level);
  const levelType = isLevelType(levelSearchParam) ? levelSearchParam : null;

  const filter = useMemo(() => ({
    price: {
      min: currentMinPrice,
      max: currentMaxPrice,
    },
    cameraType,
    category: categoryType,
    level: levelType,
  }), [cameraType, categoryType, levelType, currentMaxPrice, currentMinPrice]);
  const { filteredProducts, minPrice, maxPrice } = useMemo(() => filterByValue(products, filter), [products, filter]);

  const startIndex = (initialPage - 1) * PRODUCT_PER_PAGE;
  const endIndex = startIndex + PRODUCT_PER_PAGE;
  const pagination = useMemo(() => ({ startIndex, endIndex }), [endIndex, startIndex]);

  const sortedProducts = useMemo(() => sortByType({ products: filteredProducts, sortType, sortDirection }), [filteredProducts, sortType, sortDirection]);

  const visibleProducts = useMemo(() => getVisibleProducts({ products: sortedProducts, pagination }), [pagination, sortedProducts]);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCT_PER_PAGE);


  const handlePageChange = (page: number) => {
    setSearchParams((prevParams) => {
      prevParams.set('page', page.toString());
      return prevParams;
    });
    scrollToElement(elementRef.current || undefined);
  };

  if ((initialPage > totalPages) && isLoaded) {
    if (totalPages > 0) {
      setSearchParams((prevParams) => {
        prevParams.set('page', totalPages.toString());
        return prevParams;
      });
    }
  }

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchProducts());
    }
    if (isError) {
      toast.error('Произошла ошибка при загрузке каталога. Попробуйте перезагрузить страницу.');
    }
  }, [dispatch, isIdle, isError, isLoaded]);

  return (
    <section className="catalog" data-testid='catalog'>
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            {isLoaded && <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} />}
          </div>
          <div className="catalog__content">
            <CatalogSort />
            {isLoading && <Spinner />}

            {isLoaded && (
              <div className="cards catalog__cards" ref={elementRef}>
                {visibleProducts.length ? getProductsElements(visibleProducts) : 'По вашему запросу ничего не найдено'}
              </div>
            )}
            {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={initialPage} onClick={handlePageChange} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
