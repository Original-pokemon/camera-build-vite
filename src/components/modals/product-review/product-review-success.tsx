import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/state';
import { showModal } from '../../../store/action';
import { fetchReviews } from '../../../store/slices/review-data/review-data-thunk';
import { useEffect } from 'react';

const ReviewSuccessModal = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleButtonCloseModalClick = () => {
    dispatch(showModal(null));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchReviews(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonCloseModalClick}>Вернуться к покупкам
        </button>
      </div>
    </>
  );
};

export default ReviewSuccessModal;
