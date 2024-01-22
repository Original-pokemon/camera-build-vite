import { Link } from 'react-router-dom';
import { ProductType } from '../../../types';
import Icon from '../../icon/icon';
import RatingStars from './rating-stars/rating-stars';
import { useAppSelector } from '../../../hooks/state';

type ProductCardProps = {
  product: ProductType;
  onBuyButtonClick: () => void;
};


const ProductCard = ({ product, onBuyButtonClick }: ProductCardProps) => {
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, price, name, rating, reviewCount } = product;
  const svgSize = {
    width: 16,
    height: 16,
  };
  const basket = useAppSelector((state) => state.basket);
  const inBasket = !!basket[product.id];

  const handleBuyButtonClick = () => {
    onBuyButtonClick();
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">

          <RatingStars rating={rating} />

          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      </div>
      <div className="product-card__buttons">
        {inBasket ? (
          <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
            <Icon icon={'#icon-basket'} svgSize={svgSize} ariaHidden />
          В корзине
          </a>
        ) : (
          <button
            className="btn btn--purple product-card__btn" type="button"
            onClick={handleBuyButtonClick}
          >
            Купить
          </button>)}


        <Link className="btn btn--transparent" to={`/product/${product.id}`}>
          Подробнее
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;
