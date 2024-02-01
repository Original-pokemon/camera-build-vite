import Icon from '../../icon/icon';
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { addToBasket, getSelectedProduct, selectProduct, showModal } from '../../../store/action';
import { ModalName } from '../../../const/modal';


const CatalogAddItemModal = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(getSelectedProduct);

  if (!selectedProduct) {
    return null;
  }

  const {
    name,
    vendorCode,
    category,
    level,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = selectedProduct;

  const handleAddToCart = () => {
    dispatch(addToBasket(selectedProduct));
    dispatch(selectProduct(null));
    dispatch(showModal(ModalName.ProductAddSuccess));
  };

  return (
    <>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
            />
            <img
              src={`${previewImg}`}
              srcSet={`${previewImg2x} 2x`}
              width="140"
              height="120"
              alt={`Фотоаппарат ${name}`}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{category}</li>
            <li className="basket-item__list-item">{level}</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{price} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleAddToCart} type="button">
          <Icon icon={'#icon-add-basket'} svgSize={{ width: 24, height: 16 }} ariaHidden />
          Добавить в корзину
        </button>
      </div>
    </>
  );
};

export default CatalogAddItemModal;
