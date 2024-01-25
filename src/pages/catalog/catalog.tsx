import Slider from '../../components/catalog-section/slider/slider';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogSection from '../../components/catalog-section/catalog-section';
import { useAppSelector } from '../../hooks/state';
import CatalogAddItem from '../../components/catalog-section/catalog-add-item/catalog-add-item';
import { AppRoute } from '../../const';


export default function CatalogPage() {
  const products = useAppSelector((state) => state.products);
  const promos = useAppSelector((state) => state.promos);
  const selectedProduct = useAppSelector((state) => state.selectedProduct);
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }];


  return (
    <>
      {promos && <Slider promos={promos} />}
      <div className="page-content">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {
          products && <CatalogSection products={products} />
        }

        {selectedProduct && <CatalogAddItem selectedProduct={selectedProduct} />}
      </div>
    </>
  );
}


