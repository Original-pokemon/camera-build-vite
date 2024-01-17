type CustomInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

const CustomInputComponent = ({ type, name, placeholder, disabled = false, defaultChecked = false }: CustomInputProps) => (
  <div className="custom-input">
    <label>
      <input type={type} name={name} placeholder={placeholder} disabled={disabled} defaultChecked={defaultChecked} />
    </label>
  </div>
);

export default CustomInputComponent;
