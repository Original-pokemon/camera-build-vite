export type IconProps = {
  icon: string;
  svgSize: { width: number; height: number };
  ariaHidden: boolean;
}

const IconComponent = ({ icon, svgSize, ariaHidden }: IconProps) => (
  <svg width={svgSize.width} height={svgSize.height} aria-hidden={ariaHidden}>
    <use xlinkHref={icon}></use>
  </svg>);


export default IconComponent;
