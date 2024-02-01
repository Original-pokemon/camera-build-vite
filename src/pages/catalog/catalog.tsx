import PromoSlider from '../../components/promo-slider/promo-slider';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogSection from '../../components/catalog-section/catalog-section';
import { AppRoute } from '../../const';


export default function CatalogPage() {
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }];


  return (
    <>
      <PromoSlider />
      <div className="page-content">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <CatalogSection />
      </div>
    </>
  );
}


