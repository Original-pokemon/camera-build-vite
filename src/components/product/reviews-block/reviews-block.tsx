import { useEffect, useState } from 'react';
import ReviewCard from './review-card/review-card';
import dayjs from 'dayjs';
import Icon from '../../icon/icon';
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { getReviews, getReviewsStatus, showModal } from '../../../store/action';
import { fetchReviews } from '../../../store/slices/review-data/review-data-thunk';
import { Status } from '../../../const';
import { ReviewType } from '../../../types';

type ReviewsBlockProps = {
  productId: number;
}

const ReviewsBlock = ({ productId }: ReviewsBlockProps) => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const reviewsLoadStatus = useAppSelector(getReviewsStatus);
  const [visibleReviews, setVisibleReviews] = useState(3);


  const isLoad = reviewsLoadStatus === Status.Success;
  const isLoading = reviewsLoadStatus === Status.Loading;

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  const sortedReviews = reviews.slice().sort((a, b) => {
    const dateA = dayjs(a.createAt);
    const dateB = dayjs(b.createAt);
    return dateB.diff(dateA);
  });

  const getVisibleReviewsElements = (elements: ReviewType[]) => elements.slice(0, visibleReviews).map((review) => (
    <ReviewCard key={review.id} {...review} />
  ));

  const handleAddReviewButtonClick = () => {
    dispatch(showModal(ModalName.ProductReview));
  };

  const handleShowMoreButtonClick = () => {
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
            <button className="btn" type="button" onClick={handleAddReviewButtonClick}>
            Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {isLoading && 'Loading...'}
            {isLoad && getVisibleReviewsElements(sortedReviews)}
          </ul>
          {visibleReviews < reviews.length && (
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={handleShowMoreButtonClick}>
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
