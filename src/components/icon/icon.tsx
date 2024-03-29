export type IconProps = {
  icon: string;
  svgSize: { width: number; height: number };
  ariaHidden: boolean;
  className?: string;
}

const Icon = ({ icon, svgSize, ariaHidden, className }: IconProps) => (
  <svg className={className} width={svgSize.width} height={svgSize.height} aria-hidden={ariaHidden} data-testid="icon">
    <use xlinkHref={icon}></use>
  </svg>);


export default Icon;
