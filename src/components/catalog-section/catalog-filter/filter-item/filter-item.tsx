type FilterItemProps = {
  name: string;
  label: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

const FilterItemComponent = ({ name, label, disabled = false, defaultChecked = false }: FilterItemProps) => (
  <div className="custom-checkbox catalog-filter__item">
    <label>
      <input type="checkbox" name={name} disabled={disabled} defaultChecked={defaultChecked} />
      <span className="custom-checkbox__icon"></span>
      <span className="custom-checkbox__label">{label}</span>
    </label>
  </div>
);

export default FilterItemComponent;
