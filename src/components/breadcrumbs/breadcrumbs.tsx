import { Link } from 'react-router-dom';
import Icon from '../icon/icon';

type BreadcrumbsProps = {
  breadcrumbs: {
    link: string;
    text: string;
  }[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const getLink = ({ text, link }: { text: string; link: string }) => (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link" to={link}>
        {text}
        <Icon icon={'#icon-arrow-mini'} svgSize={{
          width: 5,
          height: 8
        }} ariaHidden
        />

      </Link>
    </li >
  );
  const getActiveLink = (text: string) => (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__link breadcrumbs__link--active">{text}</span>
    </li>
  );

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">

          {
            breadcrumbs.map((breadcrumb, index) => {
              if (index !== breadcrumbs.length - 1) {
                return getLink(breadcrumb);
              }
              return getActiveLink(breadcrumb.text);
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
