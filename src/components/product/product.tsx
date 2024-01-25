import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { ProductType } from '../../types';
import Icon from '../icon/icon';
import RatingStars from '../rating-stars/rating-stars';
import ProductTabsContent from './tabs/tabs';
import { AppRoute } from '../../const';
import { addToBasket } from '../../store/action';


type ProductProps = {
  product: ProductType;
}


const Product = ({
  product
}: ProductProps) => {
  const dispatch = useAppDispatch();
  const {
    name,
    rating,
    reviewCount,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = product;

  const basket = useAppSelector((state) => state.basket);
  const inBasket = !!basket[product.id];

  const handleBuyButtonClick = () => {
    dispatch(addToBasket(product));
  };

  const getBuyButton = () => inBasket ? (
    <Link className="btn btn--purple-border product-card__btn--in-cart" to={AppRoute.Basket}>
      <Icon icon={'#icon-basket'} svgSize={{
        width: 16,
        height: 16,
      }} ariaHidden
      />
      В корзине
    </Link>
  ) : (
    <button
      className="btn btn--purple" type="button"
      onClick={handleBuyButtonClick}
    >
      <Icon icon='#icon-add-basket' svgSize={{ width: 24, height: 16 }} ariaHidden />
      Добавить в корзину
    </button>
  );

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
              />
              <img
                src={previewImg}
                srcSet={`${previewImg2x} 2x`}
                width="560"
                height="480"
                alt={`Ретрокамера ${name}`}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{name}</h1>
            <RatingStars className="rate product__rata" rating={rating}>
              <p className="visually-hidden">Рейтинг: {rating}</p>
              <p className="rate__count">
                <span className="visually-hidden">Всего оценок:</span>
                {reviewCount}
              </p>
            </RatingStars>

            <p className="product__price">
              <span className="visually-hidden">Цена:</span>
              {price} ₽
            </p>

            {getBuyButton()}

            <ProductTabsContent {...product} />

          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;