import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/state';
import { showModal } from '../../../store/action';


const CatalogAddItemSuccessModal = () => {
  const dispatch = useAppDispatch();

  const handleContinueShopping = () => {
    dispatch(showModal(null));
  };

  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={handleContinueShopping}>
          Продолжить покупки
        </button>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleContinueShopping} to={AppRoute.Basket}>
          Перейти в корзину
        </Link>
      </div>
    </>
  );
};

export default CatalogAddItemSuccessModal;
