/* eslint-disable @typescript-eslint/no-misused-promises */
import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Icon from '../../icon/icon';
import { NewReviewType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { useParams } from 'react-router-dom';
import TextInput from './text-input/text-input';
import { ReviewRatingValue } from './const';
import ReviewRatingStar from './rating-star/rating-star';
import { getPostReviewStatus, showModal } from '../../../store/action';
import { postReview } from '../../../store/slices/review-data/review-data-thunk';
import { ModalName } from '../../../const/modal';
import { Status } from '../../../const';

type FormValue = Omit<NewReviewType, 'cameraId'>
export type FormValuesType = keyof FormValue

const AddReviewModal = () => {
  const dispatch = useAppDispatch();
  const postReviewStatus = useAppSelector(getPostReviewStatus);
  const isSubmitSuccessful = postReviewStatus === Status.Success;
  const isSubmitting = postReviewStatus === Status.Loading;
  const { id } = useParams();
  const [ratingValue, setRatingValue] = useState<number>(0);

  const form = useForm<FormValue>({
    defaultValues: {
      rating: 0,
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
    },
    mode: 'onBlur',
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid } = formState;

  const rating = register('rating', {
    required: {
      value: true,
      message: 'Нужно оценить товар'
    },
    onChange: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setRatingValue(Number(value));
    },
  });
  const userName = register('userName', {
    required: {
      value: true,
      message: 'Нужно указать имя'
    },
    minLength: {
      value: 2,
      message: 'Минимальное количество символов 2'
    },
    maxLength: {
      value: 30,
      message: 'Максимальное количество символов 30'
    },
  });
  const advantage = register('advantage', {
    required: {
      value: true,
      message: 'Нужно указать достоинства'
    },
    minLength: {
      value: 2,
      message: 'Минимальное количество символов 2'
    },
    maxLength: {
      value: 160,
      message: 'Максимальное количество символов 160'
    },
  });
  const disadvantage = register('disadvantage', {
    required: {
      value: true,
      message: 'Нужно указать недостатки'
    },
    minLength: {
      value: 2,
      message: 'Минимальное количество символов 2'
    },
    maxLength: {
      value: 160,
      message: 'Максимальное количество символов 160'
    },
  });
  const review = register('review', {
    required: {
      value: true,
      message: 'Нужно добавить комментарий'
    },
    minLength: {
      value: 2,
      message: 'Минимальное количество символов 2'
    },
    maxLength: {
      value: 160,
      message: 'Максимальное количество символов 160'
    },

  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    if (id) {
      const newReview = { ...data, rating: Number(data.rating), cameraId: Number(id) };
      dispatch(postReview(newReview));
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch(showModal(ModalName.ProductReviewSuccess));
      reset();
    }

    return () => {
      reset();
    };
  }, [dispatch, id, isSubmitSuccessful, reset]);


  return (
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-review__rate">
            <fieldset className="rate form-review__item">
              <legend className="rate__caption">Рейтинг
                <Icon icon="#icon-snowflake" svgSize={{ width: 9, height: 9 }} ariaHidden />
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {Object.entries(ReviewRatingValue).reverse().map(([score, title]) => (
                    <ReviewRatingStar key={score} score={+score} title={title} register={rating} />
                  ))}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{ratingValue}</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">{errors[rating.name]?.message}</p>
            </fieldset>

            <TextInput
              register={userName} inputPlaceholder="Введите ваше имя?"
              error={errors[userName.name]?.message}
              inputLabel='Ваше имя'
            />
            <TextInput
              register={advantage} inputPlaceholder="Основные преимущества товара"
              error={errors[advantage.name]?.message}
              inputLabel='Достоинства'
            />
            <TextInput
              register={disadvantage} inputPlaceholder="Главные недостатки товара"
              error={errors[disadvantage.name]?.message}
              inputLabel='Недостатки'
            />

            <div
              className={classNames('custom-textarea', 'form-review__item', {
                'is-invalid': errors[review.name]
              })}
            >
              <label>
                < span className="custom-textarea__label" > Комментарий
                  < Icon icon="#icon-snowflake" svgSize={{ width: 9, height: 9 }} ariaHidden />
                </span>

                <textarea
                  placeholder="Поделитесь своим опытом покупки"
                  {...review}
                >
                </textarea>
              </label>
              <div className="custom-textarea__error">{errors[review.name]?.message}</div>
            </div>

          </div>
          <button
            className="btn btn--purple form-review__btn"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Отправить отзыв
          </button>
        </form>
      </div>
    </>

  );
};

export default AddReviewModal;
