import { useEffect, useState } from 'react';
import ReviewCard from './review-card/review-card';
import dayjs from 'dayjs';
import Icon from '../../icon/icon';
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { getReviews, getReviewsStatus, showModal } from '../../../store/action';
import { fetchReviews } from '../../../store/slices/review-data/review-data-thunk';
import { Status } from '../../../const';
import { ModalName } from '../../../const/modal';
import { ReviewType } from '../../../types';
import useSmoothScrollToElement from '../../../hooks/use-scroll-to-element';
import Spinner from '../../spinner/spinner';

type ReviewsBlockProps = {
  productId: number;
}

const ReviewsBlock = ({ productId }: ReviewsBlockProps) => {
  const dispatch = useAppDispatch();
  const scrollToElement = useSmoothScrollToElement();
  const reviews = useAppSelector(getReviews);
  const reviewsLoadStatus = useAppSelector(getReviewsStatus);
  const [visibleReviews, setVisibleReviews] = useState(3);

  const isLoading = reviewsLoadStatus === Status.Loading;

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  const sortedReviews = reviews?.slice().sort((a, b) => {
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

  const handleScrollToTopButtonClick = () => {
    setVisibleReviews(3);
    scrollToElement();
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
          {isLoading && <Spinner />}
          {sortedReviews && (
            <ul className="review-block__list">
              {getVisibleReviewsElements(sortedReviews)}
            </ul>
          )}
          {visibleReviews < (reviews?.length || 0) && (
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={handleShowMoreButtonClick}>
                Показать больше отзывов
              </button>
            </div>
          )}
        </div>
      </section>
      <button className="up-btn" onClick={handleScrollToTopButtonClick}>
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
