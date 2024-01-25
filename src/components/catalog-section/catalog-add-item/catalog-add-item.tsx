import { useState } from 'react';
import Icon from '../../icon/icon';
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { addToBasket, selectProduct } from '../../../store/action';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { ProductType } from '../../../types';

type CatalogAddItemProps = {
  selectedProduct: ProductType;
}

const CatalogAddItem = ({ selectedProduct }: CatalogAddItemProps) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket);
  const [addedToCart, setAddedToCart] = useState<boolean>((selectedProduct && !!basket[selectedProduct.id]) || false);

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
    if (selectedProduct) {
      dispatch(addToBasket(selectedProduct));
      setAddedToCart(true);
    }
  };

  const handleContinueShopping = () => {
    dispatch(selectProduct(null));
    setAddedToCart(false);
  };

  const renderSuccessAddedContent = () => (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={handleContinueShopping}>
          Продолжить покупки
        </button>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>
          Перейти в корзину
        </Link>
      </div>
    </>
  );

  const renderPreviewContent = () => (
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

  return (
    <div className={`modal is-active ${addedToCart ? 'modal--narrow' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          {addedToCart ? renderSuccessAddedContent() : renderPreviewContent()}
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleContinueShopping}>
            <Icon icon={'#icon-close'} svgSize={{ width: 10, height: 10 }} ariaHidden />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogAddItem;
