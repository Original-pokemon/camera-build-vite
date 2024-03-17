type CustomInputProps = {
  type: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  testId?: string;
}

const CustomInput = ({ type, name, defaultValue, placeholder, disabled = false, testId }: CustomInputProps) => (
  <div className="custom-input">
    <label>
      <input type={type} defaultValue={defaultValue} name={name} placeholder={placeholder} disabled={disabled} data-testid={testId} />
    </label>
  </div>
);

export default CustomInput;
