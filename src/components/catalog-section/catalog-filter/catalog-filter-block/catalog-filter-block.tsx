import { ChangeEventHandler } from 'react';

type CatalogFilterBlockProps = {
  legend: string;
  children: React.ReactNode;
  onChange?: ChangeEventHandler<HTMLFieldSetElement>;
}

const CatalogFilterBlock = ({
  legend,
  children,
  onChange = (evt) => {
    evt.preventDefault();
  }
}: CatalogFilterBlockProps) => (
  <fieldset className="catalog-filter__block" onChange={onChange}>
    <legend className="title title--h5">{legend}</legend>
    {children}
  </fieldset>
);

export default CatalogFilterBlock;
