import { Link } from 'react-router-dom';
import Icon from '../icon/icon';
import { AppRoute } from '../../const';

type LogoProps = {
  className: string;
  label: string;
  svgSize: { width: number; height: number };
}

const Logo = ({ className, label, svgSize }: LogoProps): React.JSX.Element => (
  <Link className={className} to={AppRoute.Main} aria-label={label}>
    <Icon icon={'#icon-logo'} svgSize={svgSize} ariaHidden />
  </Link>
);

export default Logo;
