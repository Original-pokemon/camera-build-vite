import Icon from '../icon/icon';
import Logo from '../logo/logo';
import NavList from './nav-list/nav-list';
import SearchForm from './search-form/search-form';

const Header = () => {
  const navItems = [
    { link: 'catalog.html', text: 'Каталог' },
    { link: '#', text: 'Гарантии' },
    { link: '#', text: 'Доставка' },
    { link: '#', text: 'О компании' },
  ];
  const logo = {
    className: 'header__logo',
    href: 'index.html',
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
        <a className="header__basket-link" href="#">
          <Icon icon={'#icon-basket'} svgSize={{ width: 16, height: 16 }} ariaHidden />

        </a>
      </div>
    </header>
  );
};

export default Header;
