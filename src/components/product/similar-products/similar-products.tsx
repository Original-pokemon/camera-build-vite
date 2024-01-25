import './styles.css';

import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { useEffect } from 'react';
import { ProductType } from '../../../types';
import { fetchSimilarProducts } from '../../../store/api-action';
import ProductCard from '../../product-card/product-card';
import Icon from '../../icon/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

type SimilarProductsProps = {
  product: ProductType;
}

const SimilarProducts = ({ product }: SimilarProductsProps) => {
  const dispatch = useAppDispatch();
  const similarProducts = useAppSelector((state) => state.similarProducts);

  useEffect(() => {
    dispatch(fetchSimilarProducts(product.id));
  }, [dispatch, product.id]);

  return similarProducts && (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider" >
            <div className="product-similar__slider-list">

              <Swiper
                navigation={
                  {
                    nextEl: '.slider-controls--next',
                    prevEl: '.slider-controls--prev',
                  }
                }
                slidesPerView={3}
                modules={[Navigation]}
              >
                {similarProducts.map((similarProduct) => (
                  <SwiperSlide key={similarProduct.id}>
                    <ProductCard product={similarProduct} isActive />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
            >
              <Icon icon={'#icon-arrow'} svgSize={{ width: 7, height: 12 }} ariaHidden />
            </button>

            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
            >
              <Icon icon={'#icon-arrow'} svgSize={{ width: 7, height: 12 }} ariaHidden />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimilarProducts;
