import { ChangeEventHandler, MouseEventHandler } from 'react';

type CatalogFilterBlockProps = {
  legend: string;
  children: React.ReactNode;
  onChange?: ChangeEventHandler<HTMLFieldSetElement>;
  onClick?: MouseEventHandler<HTMLFieldSetElement>;
}

const CatalogFilterBlock = ({
  legend,
  children,
  onChange,
  onClick
}: CatalogFilterBlockProps) => (
  <fieldset className="catalog-filter__block" onClick={onClick} onChange={onChange}>
    <legend className="title title--h5">{legend}</legend>
    {children}
  </fieldset>
);

export default CatalogFilterBlock;
