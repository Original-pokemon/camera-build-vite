import IconComponent from '../icon/icon';

const BreadcrumbsComponent = () => (
  <div className="breadcrumbs">
    <div className="container">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="index.html">
            Главная

            <IconComponent icon={'#icon-arrow-mini'} svgSize={{
              width: 5,
              height: 8
            }} ariaHidden
            />

          </a>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
        </li>
      </ul>
    </div>
  </div>
);

export default BreadcrumbsComponent;