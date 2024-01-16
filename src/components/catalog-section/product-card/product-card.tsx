import IconComponent from '../../icon/icon';
import RatingStarsComponent from './rating-stars/rating-stars';

const ProductCardComponent = () => {
  const rate = 4;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet="img/content/fast-shot.webp, img/content/fast-shot@2x.webp 2x" />
          <img src="img/content/fast-shot.jpg" srcSet="img/content/fast-shot@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5" />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">

          <RatingStarsComponent rating={rate} />

          <p className="visually-hidden">Рейтинг: {rate}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
        </div>
        <p className="product-card__title">FastShot MR-5</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽</p>
      </div>
      <div className="product-card__buttons">
        <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
          <IconComponent icon={'#icon-basket'} svgSize={{ width: 16, height: 16 }} ariaHidden />
          В корзине
        </a>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
};

export default ProductCardComponent;
