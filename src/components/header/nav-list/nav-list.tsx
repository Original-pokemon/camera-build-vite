import NavItem, { NavItemProps } from './nav-item/nav-item';

type NavListProps = {
  items: NavItemProps[];
}

const NavList = ({ items }: NavListProps) => {
  const navItems = items.map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <NavItem key={index} {...item} />
  ));

  return (
    <ul className="main-nav__list">
      {navItems}
    </ul>
  );
};


export default NavList;
