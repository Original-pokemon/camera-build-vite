import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { ProductType } from '../../types';
import Icon from '../icon/icon';
import RatingStars from '../rating-stars/rating-stars';
import ProductTabsContent from './product-tabs-content/product-tabs-content';
import { ModalName, QuantityLimit } from '../../const';
import { getBasketItem, getSelectedProduct, selectProduct, showModal } from '../../store/action';
import { getProductPriceFormat } from '../../utils/product';
import { useEffect } from 'react';


type ProductProps = {
  product: ProductType;
}


const Product = ({
  product
}: ProductProps) => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(getSelectedProduct);
  const productInBasket = useAppSelector((state) => getBasketItem(state, product.id));

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
  const formattedPrice = getProductPriceFormat(price);

  const handleBuyButtonClick = () => {
    if (!selectedProduct) {
      dispatch(selectProduct(product));
    }

    dispatch(showModal(ModalName.ProductAdd));
  };

  useEffect(() => {
    dispatch(selectProduct(product));

    return () => {
      dispatch(selectProduct(null));
    };
  });

  return (
    <div className="page-content__section" data-testid="product">
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
              {formattedPrice} ₽
            </p>

            <button
              className="btn btn--purple"
              type="button"
              onClick={handleBuyButtonClick}
              data-testid="buy-button"
              disabled={productInBasket?.quantity === QuantityLimit.MAX}
            >
              <Icon icon='#icon-add-basket' svgSize={{ width: 24, height: 16 }} ariaHidden />
              Добавить в корзину
            </button>

            <ProductTabsContent {...product} />

          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
