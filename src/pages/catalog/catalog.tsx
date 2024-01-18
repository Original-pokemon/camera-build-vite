import SliderComponent from '../../components/slider/slider';
import BreadcrumbsComponent from '../../components/breadcrumbs/breadcrumbs';
import CatalogSectionComponent from '../../components/catalog-section/catalog-section';
import FooterComponent from '../../components/footer/footer';
import HeaderComponent from '../../components/header/header';
import { useAppSelector } from '../../hooks/state';


export default function CatalogPage() {
  const products = useAppSelector((state) => state.products);
  const promos = useAppSelector((state) => state.promos);

  return (
    <div className="wrapper">

      <HeaderComponent />

      <main>
        {/* <BannerComponent /> */}
        {promos && <SliderComponent promos={promos} />}
        <div className="page-content">
          <BreadcrumbsComponent />
          {
            products && <CatalogSectionComponent products={products} />
          }

        </div>
      </main>

      <FooterComponent />

    </div>
  );
}


