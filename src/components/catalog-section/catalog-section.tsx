import CatalogFilterComponent from './catalog-filter/catalog-filter';
import CatalogSortComponent from './catalog-sort/catalog-sort';
import PaginationComponent from './pagination/pagination';
import ProductCardComponent from './product-card/product-card';

const CatalogSectionComponent = () => (
  <section className="catalog">
    <div className="container">
      <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
      <div className="page-content__columns">
        <div className="catalog__aside">
          <CatalogFilterComponent />
        </div>
        <div className="catalog__content">
          <CatalogSortComponent />
          <div className="cards catalog__cards">
            <ProductCardComponent />
          </div>
          <PaginationComponent />
        </div>
      </div>
    </div>
  </section>
);

export default CatalogSectionComponent;
