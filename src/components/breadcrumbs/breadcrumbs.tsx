
import { Link } from 'react-router-dom';
import Icon from '../icon/icon';

type BreadcrumbsProps = {
  breadcrumbs: {
    link: string;
    text: string;
  }[];
}

const getLink = (key: number, { text, link }: { text: string; link: string }) => (
  <li key={key} className="breadcrumbs__item" data-testid="breadcrumb">
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
const getActiveLink = (key: number, text: string) => (
  <li key={key} className="breadcrumbs__item" data-testid="breadcrumb">
    <span className="breadcrumbs__link breadcrumbs__link--active">{text}</span>
  </li>
);

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => (
  <div className="breadcrumbs" data-testid="breadcrumbs">
    <div className="container">
      <ul className="breadcrumbs__list">
        {
          breadcrumbs.map((breadcrumb, index) => {
            if (index !== breadcrumbs.length - 1) {
              return getLink(index, breadcrumb);
            }
            return getActiveLink(index, breadcrumb.text);
          })
        }
      </ul>
    </div>
  </div>
);

export default Breadcrumbs;
