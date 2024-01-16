type CatalogFilterBlockProps = {
  legend: string;
  children: React.ReactNode;
}

const CatalogFilterBlockComponent = ({ legend, children }: CatalogFilterBlockProps) => (
  <fieldset className="catalog-filter__block">
    <legend className="title title--h5">{legend}</legend>
    {children}
  </fieldset>
);

export default CatalogFilterBlockComponent;
