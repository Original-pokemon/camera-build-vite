import { Link } from 'react-router-dom';

export type NavItemProps = {
  link: string;
  text: string;
}

const NavItem = ({ link, text }: NavItemProps) => (
  <li className="main-nav__item">
    <Link className="main-nav__link" to={link}>
      {text}
    </Link>
  </li>
);

export default NavItem;
