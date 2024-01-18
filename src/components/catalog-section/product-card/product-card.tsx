import { Link } from 'react-router-dom';
import { ProductType } from '../../../types';
import IconComponent from '../../icon/icon';
import RatingStarsComponent from './rating-stars/rating-stars';

type ProductCardProps = {
  product: ProductType;
};


const ProductCardComponent = ({ product }: ProductCardProps) => {
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, price, name, rating, reviewCount } = product;
  const svgSize = {
    width: 16,
    height: 16,
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

          <RatingStarsComponent rating={rating} />

          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      </div>
      <div className="product-card__buttons">
        <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
          <IconComponent icon={'#icon-basket'} svgSize={svgSize} ariaHidden />
          В корзине
        </a>

        <Link className="btn btn--transparent" to={`/product/${product.id}`}>
          Подробнее
        </Link>

      </div>
    </div>
  );
};

export default ProductCardComponent;
