import { useState } from 'react';
import { ReviewType } from '../../../types';
import ReviewCard from './review-card/review-card';
import dayjs from 'dayjs';
import Icon from '../../icon/icon';

type ReviewsBlockProps = {
  reviews: ReviewType[];
}

const ReviewsBlock = ({ reviews }: ReviewsBlockProps) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const sortedReviews = reviews.slice().sort((a, b) => {
    const dateA = dayjs(a.createAt);
    const dateB = dayjs(b.createAt);
    return dateB.diff(dateA);
  });

  const handleShowMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
  };

  const handleScrollToTop = () => {
    setVisibleReviews(3);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">
            Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {sortedReviews.slice(0, visibleReviews).map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </ul>
          {visibleReviews < reviews.length && (
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={handleShowMoreReviews}>
                Показать больше отзывов
              </button>
            </div>
          )}
        </div>
      </section>
      <button className="up-btn" onClick={handleScrollToTop}>
        <Icon icon={'#icon-arrow2'} svgSize={{
          width: 12,
          height: 18
        }} ariaHidden
        />
      </button>
    </div>
  );
};

export default ReviewsBlock;
