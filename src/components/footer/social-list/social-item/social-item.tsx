import IconComponent, { IconProps } from '../../../icon/icon';

export type SocialItemProps = {
  icon: {
    type: IconProps['icon'];
    size: {
      width: number;
      height: number;
    };
  };
  label: string;
  href: string;
}

const SocialItem = ({ icon, label, href }: SocialItemProps) => (
  <li className="social__item">
    <a className="link" href={href} aria-label={label}>
      <IconComponent icon={icon.type} svgSize={icon.size} ariaHidden />
    </a>
  </li>
);

export default SocialItem;
