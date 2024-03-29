import { ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { BasketItemType } from '../../types';
import { getProductPriceFormat } from '../../utils/product';
import Icon from '../icon/icon';
import { useAppDispatch } from '../../hooks/state';
import { changeProductQuantity, decreaseProductQuantity, increaseProductQuantity, selectProduct, showModal } from '../../store/action';
import { debounce } from '../../utils/debounce';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute, ModalName } from '../../const';

type BasketItemProps = {
  basketItem: BasketItemType;
}

const ButtonName = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
} as const;

const QuantityLimit = {
  MIN: 1,
  MAX: 99,
} as const;

const BasketItem = ({ basketItem, }: BasketItemProps) => {
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    vendorCode,
    type,
    category,
    level,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    quantity
  } = basketItem;

  const quantityInputRef = useRef(null);

  const onClickChangeQuantityButton = (evt: MouseEvent<HTMLElement>) => {
    if (evt.currentTarget.tagName === 'BUTTON') {
      const elem = evt.currentTarget as HTMLButtonElement;
      if (elem.name === ButtonName.INCREASE) {
        dispatch(increaseProductQuantity(id));
      }
      if (elem.name === ButtonName.DECREASE) {
        dispatch(decreaseProductQuantity(id));
      }
    }
  };

  const onChangeQuantity = (evt: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(evt.target.value, 10);
    if (isNaN(value)) {
      value = QuantityLimit.MIN;
    } else if (value < QuantityLimit.MIN) {
      value = QuantityLimit.MIN;
    } else if (value > QuantityLimit.MAX) {
      value = QuantityLimit.MAX;
    }

    dispatch(changeProductQuantity({ id, quantity: value }));
  };

  const [debouncedOnChangeQuantity] = debounce(onChangeQuantity, 500);

  const handleRemove = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(selectProduct(basketItem));
    dispatch(showModal(ModalName.ProductRemove));
  };

  useEffect(() => {
    if (quantityInputRef.current) {
      (quantityInputRef.current as HTMLInputElement).value = quantity.toString();
    }
  }, [quantity]);

  return (
    <li className="basket-item">
      <Link to={generatePath(AppRoute.Product, { id: String(id) })} className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name} />
        </picture>
      </Link>
      <div className="basket-item__description">
        <Link to={generatePath(AppRoute.Product, { id: String(id) })} className="basket-item__title">{name}</Link>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span></li>
          <li className="basket-item__list-item">{type} {category === 'Фотоаппарат' ? 'фотокамера' : category.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{getProductPriceFormat(price)} ₽
      </p>
      <div className="quantity">
        <button name={ButtonName.DECREASE} className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={onClickChangeQuantityButton} disabled={quantity <= QuantityLimit.MIN}>
          <Icon icon={'#icon-arrow'} svgSize={{ width: 7, height: 12 }} ariaHidden />
        </button>

        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" min={QuantityLimit.MIN} max={QuantityLimit.MAX} aria-label="количество товара" onChange={debouncedOnChangeQuantity} ref={quantityInputRef} />

        <button name={ButtonName.INCREASE} className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={onClickChangeQuantityButton} disabled={quantity >= QuantityLimit.MAX}>
          <Icon icon={'#icon-arrow'} svgSize={{ width: 7, height: 12 }} ariaHidden />
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {getProductPriceFormat(price * quantity)} ₽
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleRemove}>
        <Icon icon={'#icon-close'} svgSize={{ width: 10, height: 10 }} ariaHidden />
      </button>
    </li>
  );
};

export default BasketItem;

