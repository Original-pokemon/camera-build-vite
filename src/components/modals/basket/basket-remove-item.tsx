import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { getSelectedProduct, removeProduct, showModal } from '../../../store/action';

const BasketRemoveItemModal = () => {
  const dispatch = useAppDispatch();
  const selectProduct = useAppSelector(getSelectedProduct);

  if (!selectProduct) {
    return null;
  }

  const {
    id,
    name,
    type,
    level,
    category,
    vendorCode,
    previewImg,
    previewImg2x,

  } = selectProduct;

  const handleDeleteButtonClick = () => {
    dispatch(removeProduct(id));
    dispatch(showModal(null));
  };

  const handleContinueShopping = () => {
    dispatch(showModal(null));
  };

  return (
    <>
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${previewImg}, ${previewImg2x} 2x`} />
            <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span></li>
            <li className="basket-item__list-item">{type} {category === 'Фотоаппарат' ? 'фотокамера' : category.toLowerCase()}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleDeleteButtonClick}>Удалить</button>
        <button className="btn btn--transparent modal__btn modal__btn--half-width" onClick={handleContinueShopping}>Продолжить покупки</button>
      </div>
    </>
  );
};

export default BasketRemoveItemModal;
