import { useMemo, useState } from 'react';
import browserHistory from '../../browser-history/browser-history';
import { ProductType } from '../../types';
import CatalogFilter from './catalog-filter/catalog-filter';
import CatalogSort from './catalog-sort/catalog-sort';
import Pagination from './pagination/pagination';
import ProductCard from '../product-card/product-card';
import { useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';

type CatalogSectionProps = {
  products: ProductType[];
}

const CatalogSection = ({ products }: CatalogSectionProps) => {
  const [searchParams] = useSearchParams();

  const productsPerPage = 9;
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = useMemo(() => products.slice(startIndex, endIndex), [
    products,
    startIndex,
    endIndex,
  ]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const productsElements = visibleProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ));

  if (initialPage > totalPages) {
    browserHistory.push(AppRoute.PageNotFound);

  }

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>
          <div className="catalog__content">
            <CatalogSort />
            <div className="cards catalog__cards">
              {productsElements}
            </div>
            {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onClick={handlePageChange} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
