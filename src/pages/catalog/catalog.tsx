import Slider from '../../components/catalog-section/slider/slider';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogSection from '../../components/catalog-section/catalog-section';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/state';


export default function CatalogPage() {
  const products = useAppSelector((state) => state.products);
  const promos = useAppSelector((state) => state.promos);

  return (
    <div className="wrapper">

      <Header />

      <main>
        {/* <BannerComponent /> */}
        {promos && <Slider promos={promos} />}
        <div className="page-content">
          <Breadcrumbs />
          {
            products && <CatalogSection products={products} />
          }

        </div>
      </main>

      <Footer />

    </div>
  );
}


