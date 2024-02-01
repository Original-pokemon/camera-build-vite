import { useMemo, useState } from 'react';
import browserHistory from '../../browser-history/browser-history';
import { ProductType } from '../../types';
import CatalogFilter from './catalog-filter/catalog-filter';
import CatalogSort from './catalog-sort/catalog-sort';
import Pagination from './pagination/pagination';
import ProductCard from '../product-card/product-card';
import { useSearchParams } from 'react-router-dom';
import { AppRoute, Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getProducts, getProductsStatus, redirectToRoute } from '../../store/action';
import { fetchProducts } from '../../store/slices/product-data/product-data-thunk';

const PRODUCT_PER_PAGE = 9;

const CatalogSection = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const productsLoadStatus = useAppSelector(getProductsStatus);
  const products = useAppSelector(getProducts);

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(initialPage);


  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
  const endIndex = startIndex + PRODUCT_PER_PAGE;
  const visibleProducts = useMemo(() => products.slice(startIndex, endIndex), [
    products,
    startIndex,
    endIndex,
  ]);
  const totalPages = Math.ceil(products.length / PRODUCT_PER_PAGE);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getProductsElements = () => {
    const productsElements = visibleProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ));

    if (initialPage > totalPages) {
      dispatch(redirectToRoute(AppRoute.PageNotFound));
    }

    return productsElements;
  };

  return (
    <section className="catalog" >
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>
          <div className="catalog__content">
            <CatalogSort />
            <div className="cards catalog__cards" ref={elementRef}>
              {productsLoadStatus === Status.Loading && <p>Загрузка...</p>}
              {productsLoadStatus === Status.Success && getProductsElements()}
            </div>
            {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onClick={handlePageChange} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
