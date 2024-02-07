import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import RatingStars from '../../../rating-stars/rating-stars';

type ReviewCardProps = {
  review: string;
  userName: string;
  createAt: string;
  rating: number;
  advantage: string;
  disadvantage: string;
}

const ReviewCard = ({ userName, createAt, rating, advantage, disadvantage, review }: ReviewCardProps) => {
  const formattedDate = dayjs(createAt).locale('ru').format('DD MMMM');

  return (
    <li className="review-card" data-testid="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>
          {formattedDate}
        </time>
      </div>
      <RatingStars className="rate review-card__rate" rating={rating} >
        <p className="visually-hidden">Оценка: {rating}</p>
      </RatingStars>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
};

export default ReviewCard;
