import BannerComponent from '../../components/banner/banner';
import BreadcrumbsComponent from '../../components/breadcrumbs/breadcrumbs';
import CatalogSectionComponent from '../../components/catalog-section/catalog-section';
import FooterComponent from '../../components/footer/footer';
import HeaderComponent from '../../components/header/header';


export default function CatalogPage() {
  return (
    <div className="wrapper">

      <HeaderComponent />

      <main>
        <BannerComponent />

        <div className="page-content">
          <BreadcrumbsComponent />

          <CatalogSectionComponent />
        </div>
      </main>

      <FooterComponent />

    </div>
  );
}


