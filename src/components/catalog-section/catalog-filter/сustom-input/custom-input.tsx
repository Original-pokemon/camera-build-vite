type CustomInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  testId?: string;
}

const CustomInput = ({ type, name, placeholder, disabled = false, testId }: CustomInputProps) => (
  <div className="custom-input">
    <label>
      <input type={type} name={name} placeholder={placeholder} disabled={disabled} data-testid={testId} />
    </label>
  </div>
);

export default CustomInput;
