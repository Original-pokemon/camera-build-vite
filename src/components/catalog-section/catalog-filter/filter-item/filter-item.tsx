import { ChangeEventHandler } from 'react';

type FilterItemProps = {
  name: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
}

const FilterItem = ({
  name,
  label,
  checked = false,
  onChange = () => true,
  disabled = false }: FilterItemProps) => (
  <div className="custom-checkbox catalog-filter__item">
    <label>
      <input type="checkbox" name={name} checked={checked} disabled={disabled} onChange={onChange} />
      <span className="custom-checkbox__icon"></span>
      <span className="custom-checkbox__label">{label}</span>
    </label>
  </div>
);

export default FilterItem;
