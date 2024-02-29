type CustomInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

const CustomInput = ({ type, name, placeholder, disabled = false }: CustomInputProps) => (
  <div className="custom-input">
    <label>
      <input type={type} name={name} placeholder={placeholder} disabled={disabled} />
    </label>
  </div>
);

export default CustomInput;
