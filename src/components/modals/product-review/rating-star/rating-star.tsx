import { UseFormRegisterReturn } from 'react-hook-form';
import { FormValuesType } from '../product-review';

type ReviewRatingStarProps = {
  score: number;
  title: string;
  register?: UseFormRegisterReturn<FormValuesType>;
}

const ReviewRatingStar = ({ score, title, register }: ReviewRatingStarProps) => {
  const id = `star-${score}`;

  return (
    <>
      <input
        className="visually-hidden"
        id={id}
        type="radio"
        value={score}
        {...register}
      />
      <label className="rate__label" htmlFor={id} title={title}></label>
    </>
  );
};

export default ReviewRatingStar;
