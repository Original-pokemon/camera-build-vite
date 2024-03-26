import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/state';
import { resetBasket, showModal } from '../../../store/action';
import { useEffect } from 'react';

const ProductBasketSuccess = () => {
  const dispatch = useAppDispatch();

  const handleContinueShopping = () => {
    dispatch(showModal(null));
  };

  useEffect(() => () => {
    dispatch(resetBasket());
  });

  return (
    <>
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link to={AppRoute.Main} className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleContinueShopping}>Вернуться к покупкам
        </Link>
      </div>
    </>
  );
};

export default ProductBasketSuccess;
