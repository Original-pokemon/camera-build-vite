import { UseFormRegisterReturn } from 'react-hook-form';
import Icon from '../../../icon/icon';
import { FormValuesType } from '../product-review';
import classNames from 'classnames';

type TextInputProps = {
  inputLabel: string;
  inputPlaceholder: string;
  register: UseFormRegisterReturn<FormValuesType>;
  error?: string;
}

const TextInput = ({ inputLabel, inputPlaceholder, error, register }: TextInputProps) => (
  <div className={classNames('custom-input form-review__item', {
    'is-invalid': error
  })}
  >
    <label>
      <span className="custom-input__label" > {inputLabel}
        < Icon icon="#icon-snowflake" svgSize={{ width: 9, height: 9 }} ariaHidden />
      </span >
      <input
        type='text'
        placeholder={inputPlaceholder}
        {...register}
      />
    </label >
    <p className="custom-input__error">{error}</p>
  </div >
);

export default TextInput;
