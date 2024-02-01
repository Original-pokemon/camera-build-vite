import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/state';
import Icon from '../icon/icon';
import Logo from '../logo/logo';
import NavList from './nav-list/nav-list';
import SearchForm from './search-form/search-form';
import { AppRoute } from '../../const';
import { getBasketTotal } from '../../store/action';

const Header = () => {
  const basketTotal = useAppSelector(getBasketTotal);
  const navItems = [
    { link: AppRoute.Main, text: 'Каталог' },
    { link: '', text: 'Гарантии' },
    { link: '', text: 'Доставка' },
    { link: '', text: 'О компании' },
  ];

  const logo = {
    className: 'header__logo',
    label: 'Переход на главную',
    svgSize: {
      width: 100,
      height: 36
    }
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Logo {...logo} />
        <nav className="main-nav header__main-nav">

          <NavList items={navItems} />

        </nav>
        <div className="form-search">
          <SearchForm />
          <button className="form-search__reset" type="reset">
            <Icon icon={'#icon-close'} svgSize={{ width: 10, height: 10 }} ariaHidden />

            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <Icon icon={'#icon-basket'} svgSize={{ width: 16, height: 16 }} ariaHidden />
          {!!basketTotal && <span className="header__basket-count">{basketTotal}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
