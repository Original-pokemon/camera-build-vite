import IconComponent from '../icon/icon';

type LogoProps = {
  className: string;
  href: string;
  label: string;
  svgSize: { width: number; height: number };
}

const Logo = ({ className, href, label, svgSize }: LogoProps): React.JSX.Element => (
  <a className={className} href={href} aria-label={label}>
    <IconComponent icon={'#icon-logo'} svgSize={svgSize} ariaHidden />
  </a >
);

export default Logo;
