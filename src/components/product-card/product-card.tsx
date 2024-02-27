import { Link } from 'react-router-dom';
import { ProductType } from '../../types';
import Icon from '../icon/icon';
import RatingStars from '../rating-stars/rating-stars';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { AppRoute, getProductPath } from '../../const';
import { getBasketItem, selectProduct, showModal } from '../../store/action';
import { ModalName } from '../../const/modal';
import { getProductPriceFormat } from '../../utils/product';

type ProductCardProps = {
  product: ProductType;
  isActive?: boolean;
};

const getBuyButton = (inBasket: boolean, handleBuyButtonClick: () => void) => inBasket ? (
  <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
    <Icon icon={'#icon-basket'} svgSize={{
      width: 16,
      height: 16,
    }} ariaHidden
    />
    В корзине
  </Link>
) : (
  <button
    className="btn btn--purple product-card__btn" type="button"
    onClick={handleBuyButtonClick}
  >
    Купить
  </button>
);

const ProductCard = ({ product, isActive = false }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { id, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, price, name, rating, reviewCount } = product;
  const inBasket = useAppSelector((state) => getBasketItem(state, id));
  const formattedPrice = getProductPriceFormat(price);

  const handleBuyButtonClick = () => {
    dispatch(showModal(ModalName.ProductAdd));
    dispatch(selectProduct(product));
  };

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>

      <div className="product-card__info">
        <RatingStars className="rate product-card__rate" rating={rating}>
          <p className="visually-hidden">
            Рейтинг:
            {rating}
          </p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </RatingStars>

        <p className="product-card__title"> {name} </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formattedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">

        {getBuyButton(!!inBasket, handleBuyButtonClick)}

        <Link className="btn btn--transparent" to={getProductPath(id)}>
          Подробнее
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;
