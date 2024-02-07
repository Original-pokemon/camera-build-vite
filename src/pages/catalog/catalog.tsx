import PromoSlider from '../../components/promo-slider/promo-slider';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogSection from '../../components/catalog-section/catalog-section';
import { AppRoute } from '../../const';
import { useEffect } from 'react';
import useSmoothScrollToElement from '../../hooks/use-scroll-to-element';

const CatalogPage = () => {
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }];
  const scrollToElement = useSmoothScrollToElement();


  useEffect(() => {
    scrollToElement();
  }, [scrollToElement]);

  return (
    <>
      <PromoSlider />
      <div className="page-content">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <CatalogSection />
      </div>
    </>
  );
};

export default CatalogPage;


