export type NavItemProps = {
  link: string;
  text: string;
}

const NavItem = ({ link, text }: NavItemProps) => (
  <li className="main-nav__item">
    <a className="main-nav__link" href={link}>
      {text}
    </a>
  </li>
);

export default NavItem;
