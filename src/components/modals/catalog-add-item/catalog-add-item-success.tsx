import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/state';
import { selectProduct, showModal } from '../../../store/action';
import { useEffect } from 'react';


const CatalogAddItemSuccessModal = () => {
  const dispatch = useAppDispatch();

  const handleContinueShopping = () => {
    dispatch(showModal(null));
  };

  useEffect(() => () => {
    dispatch(selectProduct(null));
  });

  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link to={AppRoute.Main} className="btn btn--transparent modal__btn" onClick={handleContinueShopping}>
          Продолжить покупки
        </Link>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleContinueShopping} to={AppRoute.Basket}>
          Перейти в корзину
        </Link>
      </div>
    </>
  );
};

export default CatalogAddItemSuccessModal;
