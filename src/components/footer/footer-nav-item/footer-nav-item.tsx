type FooterNavItemProps = {
  title: string;
  items: { link: string; text: string }[];
}

const FooterNavItem = ({ title, items }: FooterNavItemProps) => (
  <li className="footer__nav-item">
    <p className="footer__title">{title}</p>
    <ul className="footer__list">
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className="footer__item">
          <a className="link" href={item.link}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </li>
);

export default FooterNavItem;
